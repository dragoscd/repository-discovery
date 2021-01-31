import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import React, { useEffect } from 'react';
import useFetch from 'use-http';
import CardList from '../../components/CardList';
import { IRepository } from '../../types/common';
import { useMyRepositories } from './MyRepositories.context';

const NewRepositoriesContainer: React.FC = () => {
  const {
    starredRepositories,
    removeRepository,
    upsertRepository,
    updateRepository,
  } = useMyRepositories();

  const lastWeekDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');

  const { data, loading, error } = useFetch<{ items: IRepository[] }>(
    `/search/repositories?q=created:>${lastWeekDate}&sort=stars&order=desc`,
    []
  );

  useEffect(() => {
    let repositoriesToUpdate: IRepository[] = [];

    data?.items?.forEach(repository => {
      if (starredRepositories[repository.id]) {
        repositoriesToUpdate.push(repository);
      }
    });

    updateRepository(repositoriesToUpdate);
  }, [data]);

  const repositories = data?.items
    ? data.items.map(
        ({
          id,
          name,
          stargazers_count,
          url,
          html_url,
          languages_url,
          description,
          created_at,
        }) => ({
          id,
          name,
          stargazers_count: starredRepositories[id]
            ? stargazers_count + 1
            : stargazers_count,
          url,
          html_url,
          languages_url,
          description,
          created_at,
        })
      )
    : undefined;

  return (
    <CardList
      data={repositories}
      loading={loading}
      error={!!error}
      isCardStarred={repositoryID => !!starredRepositories[repositoryID]}
      onStared={repository => {
        if (starredRepositories[repository.id]) {
          removeRepository([repository.id]);
        } else {
          upsertRepository([repository]);
        }
      }}
    />
  );
};

export default NewRepositoriesContainer;
