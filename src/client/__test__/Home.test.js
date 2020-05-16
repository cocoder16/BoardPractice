import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

import Home from '~c/pages/Home';

it ("snapshot", () => {
    const tree = render(<Home/>);
    expect(tree.container).toMatchSnapshot();
})

it ("render h1 correctly", () => {
    const { getByTestId, getByText } = render(<Home/>);
    expect(getByTestId('h1tag')).toHaveTextContent('Hello');
    expect(getByText('Hello React')).toHaveClass('fancy-h1');
})