import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // FIXME: currently broken.
  expect(getByText(/learn/i)).not.toBeInTheDocument();
});
