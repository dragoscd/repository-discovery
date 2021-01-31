import { IRepository } from '../../types/common';

const localCacheName = 'starredRepositories';

const getCache = () => {
  try {
    return JSON.parse(localStorage.getItem(localCacheName) || '{}');
  } catch (err) {
    localStorage.removeItem(localCacheName);
    return {};
  }
};

const setCache = (data: { [key: string]: IRepository }) => {
  localStorage.setItem(localCacheName, JSON.stringify(data));
};

export { getCache, setCache };
