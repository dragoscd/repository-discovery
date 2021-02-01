import React from 'react';
import {
  configure,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';

const DATA_QA_ATTRIBUTE = 'data-qa';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  configure({ testIdAttribute: DATA_QA_ATTRIBUTE });

  return render(ui, options);
};

export * from '@testing-library/react';
export { customRender as render };
