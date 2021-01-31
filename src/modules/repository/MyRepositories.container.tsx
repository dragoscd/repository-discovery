import React from 'react';
import CardList from '../../components/CardList';
import { useMyRepositories } from './MyRepositories.context';

const MyRepositoriesContainer: React.FC = () => {
  const { starredRepositories, removeRepository } = useMyRepositories();

  const repositories = Object.keys(starredRepositories).map(
    key => starredRepositories[key].repository
  );

  return (
    <CardList
      data={repositories}
      isCardStarred={() => true}
      onStared={repository => removeRepository([repository.id])}
    />
  );
};

export default MyRepositoriesContainer;
