import React, { useEffect, useState } from 'react';
import { fetchRepositories } from '../../api';
import CardList from '../../components/CardList';
import { IRepository } from '../../types/common';

import { repositoryMock } from './fixtures';

const NewRepositoriesContainer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[] | undefined>();
  const [error, setError] = useState<boolean>();

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetchRepositories({ createdFrom: '2019-01-10' })
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

  return <CardList data={repositories} loading={loading} error={error} />;
};

export default NewRepositoriesContainer;
