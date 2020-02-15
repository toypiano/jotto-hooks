import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();

const setup = props => {
  return shallow(
    <LanguagePicker setLanguage={mockSetLanguage} {...props} />
  );
};

it('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(
    wrapper,
    'component-language-picker'
  );
  expect(component.exists()).toBe(true);
});

it('does not throw warning with expected props', () => {
  const expectedProps = { setLanguage: jest.fn() };
  checkProps(LanguagePicker, expectedProps);
});

it('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});

it('calls setLanguage prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  // returns first ShallowWrapper obj
  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');
  expect(mockSetLanguage).toHaveBeenCalled();
});
