import React from 'react';
// Enzyme currently(Feb 2020) doesn't run useEffect on shallow
// React recommends using React Testing Library
// https://reactjs.org/docs/testing.html#tools
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

// we'll mock this module
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();
/**
 * Setup function for App component
 * @returns {Object} - ReactWrapper
 */
const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // use mount, because useEffect not called on 'shallow'
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord', () => {
  it('gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
});
