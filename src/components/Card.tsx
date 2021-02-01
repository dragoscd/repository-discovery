import format from 'date-fns/format';
import React from 'react';
import styled, { css } from 'styled-components';
import { IRepository } from '../types/common';
import GithubIcon from './icons/Github';
import StarIcon from './icons/Star';

export const block = 'card';

export enum SYNC_STATUS {
  SYNC = 'SYNC',
  UPDATED = 'UPDATED',
  ERROR = 'ERROR',
}

const overflowEllipsis = css`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  box-shadow: 1px 1px 8px rgba(51, 51, 51, 0.15);
  border-radius: 8px;
  justify-content: space-between;
`;

const CardHeader = styled.h2`
  ${overflowEllipsis}
`;

const CardUrlText = styled.span`
  ${overflowEllipsis}
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  overflow: hidden;
`;

const ActionsColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  width: 70px;
  margin-left: 12px;
  flex-direction: column;
`;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #323232;
  font-size: 14px;
  text-decoration: none;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledGithubIcon = styled(GithubIcon)`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  flex-shrink: 0;
`;

const StyledStarIcon = styled(StarIcon)`
  margin-right: 4px;
`;

const Description = styled.div`
  color: #323232;
  font-size: 14px;
  margin-top: 12px;
`;

const ButtonStars = styled.button<{ starred?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 28px;
  border: 1px solid ${({ starred }) => (starred ? '#d2aa09' : '#666')};
  color: ${({ starred }) => (starred ? '#d2aa09' : '#666')};
  border-radius: 8px;
  padding: 4px 8px;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  line-height: 24px;

  &:focus {
    padding: 3px 7px;
    border: 2px solid ${({ starred }) => (starred ? '#d2aa09' : '#666')};
    outline: none;
  }
`;

const DateWrapper = styled.div`
  font-size: 12px;
  padding-top: 4px;
`;

const CardStatus = styled.div<{ status: SYNC_STATUS }>`
  padding-top: 12px;
  font-size: 10px;

  color: ${({ status }) => {
    switch (status) {
      case SYNC_STATUS.UPDATED:
        return '#4BB543';
      case SYNC_STATUS.ERROR:
        return '#FF9494';
      case SYNC_STATUS.SYNC:
        return '#0277BD';
      default:
        return '#323232';
    }
  }};
`;

export type CardProps = {
  data: IRepository;
  className?: string;
  onStared?: (data: IRepository) => void;
  isStarred?: boolean;
  status?: SYNC_STATUS;
};

const Card: React.FC<CardProps> = ({
  data,
  className,
  isStarred = false,
  onStared,
  status,
}) => {
  const {
    name = '-',
    html_url,
    description = 'No description available',
    stargazers_count = 0,
    created_at,
  } = data || {};

  return (
    <CardWrapper className={className} data-qa={block}>
      <InfoColumn>
        <CardHeader title={name}>{name}</CardHeader>
        <GithubLink href={html_url} target="_blank" title={name}>
          <StyledGithubIcon />
          <CardUrlText>{html_url}</CardUrlText>
        </GithubLink>
        <Description>{description}</Description>
      </InfoColumn>
      <ActionsColumn>
        <ButtonStars
          onClick={() => onStared && onStared(data)}
          starred={isStarred}
          data-qa={`${block}__star-button`}
        >
          <StyledStarIcon fillColor={isStarred ? '#d2aa09' : '#666'} />
          {stargazers_count}
        </ButtonStars>
        <DateWrapper data-qa={`${block}__date`}>
          {format(new Date(created_at), 'dd.MM')}
        </DateWrapper>
        {status && (
          <CardStatus status={status} data-qa={`${block}__status`}>
            {status}
          </CardStatus>
        )}
      </ActionsColumn>
    </CardWrapper>
  );
};

export default Card;
