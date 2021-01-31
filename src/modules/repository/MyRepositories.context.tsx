import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IRepository } from '../../types/common';
import { getCache, setCache } from './localCache';
import useSSR from 'use-ssr';

interface MyRepositoriesContextProps {
  starredRepositories: {
    [key: string]: { repository: IRepository; lastUpdated: Date };
  };
  upsertRepository: (data: IRepository[]) => void;
  updateRepository: (data: IRepository[]) => void;
  removeRepository: (data: string[] | number[]) => void;
}

const MyRepositoriesContext = createContext<MyRepositoriesContextProps>({
  starredRepositories: {},
  upsertRepository: () => null,
  updateRepository: () => null,
  removeRepository: () => null,
});

const MyRepositoryProvider: React.FC = ({ children }) => {
  const { isServer } = useSSR();
  const [starredRepositories, setStarredRepositories] = useState(() => {
    return isServer ? {} : getCache();
  });

  useEffect(() => {
    setCache(starredRepositories);
  }, [starredRepositories]);

  const upsertRepository = useCallback(
    (repositories: IRepository[] = []) => {
      const newRepositories = { ...starredRepositories };

      repositories.forEach(
        repository =>
          (newRepositories[repository.id] = {
            repository,
            lastUpdated: Date.now(),
          })
      );

      setStarredRepositories(newRepositories);
    },
    [starredRepositories]
  );

  const removeRepository = useCallback(
    (repositoriesIDs: string[] | number[] = []) => {
      const newRepositories = { ...starredRepositories };

      repositoriesIDs.forEach((repositoryID: string | number) => {
        delete newRepositories[repositoryID];
      });

      setStarredRepositories(newRepositories);
    },
    [starredRepositories]
  );

  const updateRepository = useCallback(
    (repositories: IRepository[] = []) => {
      const newRepositories = { ...starredRepositories };

      repositories.forEach(repository => {
        if (newRepositories[repository.id]) {
          newRepositories[repository.id] = {
            repository,
            lastUpdated: Date.now(),
          };
        }
      });

      setStarredRepositories(newRepositories);
    },
    [starredRepositories]
  );

  return (
    <MyRepositoriesContext.Provider
      value={{
        starredRepositories,
        upsertRepository,
        removeRepository,
        updateRepository,
      }}
    >
      {children}
    </MyRepositoriesContext.Provider>
  );
};

const useMyRepositories = () => {
  return useContext(MyRepositoriesContext);
};

export { MyRepositoryProvider, useMyRepositories };
