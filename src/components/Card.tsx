import React from 'react';
import styled, { css } from 'styled-components';
import { IRepository } from '../types/common';
import GithubIcon from './icons/Github';
import StarIcon from './icons/Star';

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
  justify-content: flex-end;
  flex-shrink: 0;
  flex-grow: 0;
  width: 70px;
  margin-left: 12px;
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

export type CardProps = {
  data: IRepository;
  className?: string;
  onStared?: (data: IRepository) => void;
  isStarred?: boolean;
};

const Card: React.FC<CardProps> = ({
  data,
  className,
  isStarred = false,
  onStared,
}) => {
  const {
    name = '-',
    html_url,
    description = 'No description available',
    stargazers_count = 0,
  } = data || {};

  return (
    <CardWrapper className={className}>
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
        >
          <StyledStarIcon fillColor={isStarred ? '#d2aa09' : '#666'} />
          {stargazers_count}
        </ButtonStars>
      </ActionsColumn>
    </CardWrapper>
  );
};

export default Card;
