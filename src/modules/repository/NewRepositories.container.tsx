import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import React, { useEffect, useState } from 'react';
import { fetchRepositories } from '../../api';
import CardList from '../../components/CardList';
import { IRepository } from '../../types/common';
import { useMyRepositories } from './MyRepositories.context';

const NewRepositoriesContainer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[] | undefined>();
  const [error, setError] = useState<boolean>();
  const {
    starredRepositories,
    removeRepository,
    upsertRepository,
  } = useMyRepositories();

  useEffect(() => {
    setError(false);
    setLoading(true);

    const lastWeekDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    fetchRepositories({ createdFrom: lastWeekDate })
      .then(({ items }) => {
        if (Array.isArray(items)) {
          const repositoriesData = items.map(
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
              stargazers_count,
              url,
              html_url,
              languages_url,
              description,
              created_at,
            })
          );
          setRepositories(repositoriesData);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CardList
      data={repositories}
      loading={loading}
      error={error}
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
