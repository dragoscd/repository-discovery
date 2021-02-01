import React from 'react';
import { render } from '../testing';
import CardList, { block } from './CardList';
import { block as cardBlock } from './Card';
import { repositoryListMock } from '../fixtures';

describe('CardList', () => {
  it('should render a list of cards', () => {
    const { getAllByTestId } = render(<CardList data={repositoryListMock} />);

    expect(getAllByTestId(cardBlock).length).toEqual(repositoryListMock.length);
  });

  it('should display the empty state', () => {
    const { getByTestId } = render(<CardList data={[]} />);

    getByTestId(`${block}__message--empty`);
  });

  it('should display the loading state', () => {
    const { getByTestId } = render(<CardList loading={true} />);

    getByTestId(`${block}__message--loading`);
  });

  it('should display the error state', () => {
    const { getByTestId } = render(<CardList error={true} />);

    getByTestId(`${block}__message--error`);
  });

  it('should not display loader if there is data', () => {
    const { getAllByTestId, queryByTestId } = render(
      <CardList data={repositoryListMock} loading={true} />
    );

    expect(getAllByTestId(cardBlock).length).toEqual(repositoryListMock.length);

    const loadingMessage = queryByTestId(`${block}__message--loading`);

    expect(loadingMessage).not.toBeInTheDocument();
  });
});
