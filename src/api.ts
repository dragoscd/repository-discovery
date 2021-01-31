import { IRepository } from './types/common';

// TODO load url from .env
export const API_URL = 'https://api.github.com/search/repositories';
const GITHUB_TOKEN = '0169ee60e001fc5a5957a7e281d6d2093174b2ff';

export const fetchRepositories = async ({
  createdFrom,
}: {
  createdFrom: string;
}): Promise<{ items: IRepository[] }> => {
  return fetch(`${API_URL}?q=created:>${createdFrom}&sort=stars&order=desc`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  }).then(response => response.json());
};
