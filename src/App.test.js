import React from "react";
// Enzyme currently(Feb 2020) doesn't run useEffect on shallow
// React recommends using React Testing Library
// https://reactjs.org/docs/testing.html#tools
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

// we'll mock this module
import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();
/**
 * Setup function for App component
 * @returns {Object} - ReactWrapper
 */
const setup = (secretWord = "piano") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([
    { secretWord, language: "eng" },
    jest.fn() // would () => {} work too?
  ]);

  React.useReducer = mockUseReducer;

  // use mount, because useEffect not called on 'shallow'
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord", () => {
  it("gets called on App mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  it(`doesn't update state on App update`, () => {
    const wrapper = setup(); // App is mounted here. mock is called once.
    mockGetSecretWord.mockClear(); // clear
    wrapper.setProps(); // force re-render
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("piano");
  });
  it("renders app when secretWord is not null", () => {
    const app = findByTestAttr(wrapper, "component-app");
    expect(app.exists()).toBe(true);
  });
  it("does not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  it("does not renders app when secretWord is null", () => {
    const app = findByTestAttr(wrapper, "component-app");
    expect(app.exists()).toBe(false);
  });
  it("renders spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(true);
  });
});
