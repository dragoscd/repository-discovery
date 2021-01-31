import React, { useEffect } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import CardList from '../../components/CardList';
import { IRepository } from '../../types/common';
import { useMyRepositories } from './MyRepositories.context';

const BATCH_SIZE = 2;

const MyRepositoriesContainer: React.FC = () => {
  const {
    starredRepositories,
    updateRepository,
    removeRepository,
  } = useMyRepositories();
  const { get } = useFetch({ cachePolicy: CachePolicies.NETWORK_ONLY });

  const repositories = Object.keys(starredRepositories).map(
    key => starredRepositories[key].repository
  );

  const fetchRepository = async (repository: IRepository) => {
    const url = new URL(repository.url);

    const repositoryData = await get(url.pathname);

    updateRepository([repositoryData]);

    return repositoryData;
  };

  useEffect(() => {
    const batchedRepositories = repositories
      .map((_, i) =>
        i % BATCH_SIZE ? null : repositories.slice(i, i + BATCH_SIZE)
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
      onStared={repository => removeRepository([repository.id])}
    />
  );
};

export default MyRepositoriesContainer;
