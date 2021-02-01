import React from 'react';
import { render, fireEvent } from '../testing';
import Card, { block, SYNC_STATUS } from './Card';
import { repositoryMock } from '../fixtures';

const STARRED_COLOR = '#d2aa09';

describe('Card', () => {
  it('should display all the informations', () => {
    const { getByText } = render(<Card data={repositoryMock} />);

    getByText(repositoryMock.name);
    getByText(repositoryMock.html_url);
    getByText(repositoryMock.description);
  });

  it('should trigger an action when star button is clicker', () => {
    const mockedStarAction = jest.fn();
    const { getByTestId } = render(
      <Card data={repositoryMock} onStared={mockedStarAction} />
    );

    fireEvent.click(getByTestId(`${block}__star-button`));

    expect(mockedStarAction).toBeCalledWith(repositoryMock);
  });

  it('should display the proper status', () => {
    const { getByTestId, rerender } = render(
      <Card data={repositoryMock} status={SYNC_STATUS.SYNC} />
    );

    const statusWrapper = getByTestId(`${block}__status`);

    expect(statusWrapper).toHaveTextContent(SYNC_STATUS.SYNC);

    rerender(<Card data={repositoryMock} status={SYNC_STATUS.ERROR} />);

    expect(statusWrapper).toHaveTextContent(SYNC_STATUS.ERROR);

    rerender(<Card data={repositoryMock} status={SYNC_STATUS.UPDATED} />);

    expect(statusWrapper).toHaveTextContent(SYNC_STATUS.UPDATED);
  });

  it('should have the proper ui when starred', () => {
    const { getByTestId, rerender } = render(
      <Card data={repositoryMock} isStarred={false} />
    );

    const starButton = getByTestId(`${block}__star-button`);

    expect(starButton).not.toHaveStyle(`color:${STARRED_COLOR}`);

    rerender(<Card data={repositoryMock} isStarred={true} />);

    expect(starButton).toHaveStyle(`color:${STARRED_COLOR}`);
  });
});
