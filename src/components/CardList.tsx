import React from 'react';
import styled from 'styled-components';
import { IRepository } from '../types/common';
import Card, { CardProps, SYNC_STATUS } from './Card';

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  min-width: 350px;
`;

const NotificationMessage = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CardListProps {
  data?: IRepository[];
  loading?: boolean;
  error?: boolean;
  isCardStarred?: (repositoryID: number) => boolean;
  updateStatus?: (repositoryID: number) => SYNC_STATUS;
}

const CardList: React.FC<CardListProps & Pick<CardProps, 'onStared'>> = ({
  data,
  loading = false,
  error = false,
  onStared,
  isCardStarred,
  updateStatus,
}) => {
  if (!data && loading) {
    return <NotificationMessage>Loading ...</NotificationMessage>;
  }

  if (error) {
    return (
      <NotificationMessage>
        Auch! Something went wrong please try again later.
      </NotificationMessage>
    );
  }

  if (data && data.length === 0) {
    return <NotificationMessage>No data available</NotificationMessage>;
  }

  return (
    <div>
      {(data || []).map(repository => {
        const cardStarred = isCardStarred && isCardStarred(repository.id);
        const cardStatus = updateStatus && updateStatus(repository.id);

        return (
          <StyledCard
            key={repository.id}
            data={repository}
            isStarred={cardStarred}
            onStared={() => onStared && onStared(repository)}
            status={cardStatus}
          />
        );
      })}
    </div>
  );
};

export default CardList;
