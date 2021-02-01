import differenceInMinutes from 'date-fns/fp/differenceInMinutes';
import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import { SYNC_STATUS } from '../../components/Card';
import CardList from '../../components/CardList';
import { IRepository } from '../../types/common';
import { useMyRepositories } from './MyRepositories.context';

const BATCH_SIZE = 2;
const OUTDATE_TOLLERANCE_MINUTES = 1;

const MyRepositoriesContainer: React.FC = () => {
  const {
    starredRepositories,
    updateRepository,
    removeRepository,
  } = useMyRepositories();
  const { get } = useFetch();
  const [status, setStatus] = useState<{ [key: string]: SYNC_STATUS }>({});

  const repositories = Object.keys(starredRepositories).map(
    key => starredRepositories[key].repository
  );

  const fetchRepository = async (repository: IRepository) => {
    const url = new URL(repository.url);

    setStatus({ [repository.id]: SYNC_STATUS.SYNC });

    try {
      const repositoryData = await get(url.pathname);
      updateRepository([repositoryData]);

      setStatus({ [repository.id]: SYNC_STATUS.UPDATED });

      return repositoryData;
    } catch {
      setStatus({ [repository.id]: SYNC_STATUS.ERROR });

      return repository;
    }
  };

  useEffect(() => {
    const repositoriesToUpdate = Object.keys(starredRepositories)
      .filter(
        key =>
          differenceInMinutes(
            new Date(starredRepositories[key].lastUpdated),
            new Date()
          ) >= OUTDATE_TOLLERANCE_MINUTES
      )
      .map(key => starredRepositories[key].repository);

    const batchedRepositories = repositoriesToUpdate
      .map((_, i) =>
        i % BATCH_SIZE ? null : repositoriesToUpdate.slice(i, i + BATCH_SIZE)
      )
      .filter(batch => batch);

    const batchedResolvers = batchedRepositories.map(
      repositoryBatch => async (
        previousResolvedRepositories: IRepository[]
      ): Promise<IRepository[]> => {
        const resolvedBatch = repositoryBatch
          ? await Promise.all(repositoryBatch.map(fetchRepository))
          : [];

        return [...previousResolvedRepositories, ...resolvedBatch];
      }
    );

    batchedResolvers.reduce(
      async (acc: Promise<IRepository[]>, batchGroupFunction) => {
        const resolvedRepositories = await acc;
        return batchGroupFunction(resolvedRepositories);
      },
      Promise.resolve([])
    );
  }, []);

  return (
    <CardList
      data={repositories}
      isCardStarred={() => true}
      updateStatus={repositoryID => status[repositoryID] || SYNC_STATUS.UPDATED}
      onStared={repository => removeRepository([repository.id])}
    />
  );
};

export default MyRepositoriesContainer;
