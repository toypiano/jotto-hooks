import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import Input from './Input';
import { checkProps } from '../test/testUtils';

const defaultProps = { secretWord: 'piano' };

/**
 * Setup function for Input component
 * @returns {Object} - ShallowWrapper
 */
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

it('does not throw warning with expected props', () => {
  const conformingProps = defaultProps;
  checkProps(Input, conformingProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn(),
    wrapper;
  beforeEach(() => {
    // clear the results from the last test.
    mockSetCurrentGuess.mockClear();
    // replace useState with mock function
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });
  test('state updates with value of input control upon change', () => {
    const inputControl = findByTestAttr(wrapper, 'input-control');
    const mockEvent = { target: { value: 'conga' } };
    inputControl.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('conga');
  });
  test('state resets to empty string on submit', () => {
    const form = findByTestAttr(wrapper, 'form');
    const mockEvent = {
      target: { value: '' },
      preventDefault: () => {}
    };
    form.simulate('submit', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
