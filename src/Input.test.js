import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";
import { checkProps } from "../test/testUtils";
import languageContext from "./contexts/languageContext";

/**
 * Setup function for Input component
 * @returns {Object} - ShallowWrapper
 */
const setup = ({ language, secretWord }) => {
  language = language || "eng";
  secretWord = secretWord || "piano";
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

describe("based on language context", () => {
  describe("submit string", () => {
    it("is correctly rendered in english", () => {
      const wrapper = setup({});
      const submitButton = wrapper.find("button");
      expect(submitButton.text()).toMatch(/Submit/i);
    });
    it("is correctly rendered in korean", () => {
      const wrapper = setup({ language: "kor" });
      const submitButton = wrapper.find("button");
      expect(submitButton.text()).toMatch(/제출/);
    });
  });
  describe("input placeholder", () => {
    it("is correctly rendered in english", () => {
      const wrapper = setup({});
      const inputControl = findByTestAttr(wrapper, "input-control");
      expect(inputControl.prop("placeholder")).toMatch(/enter/);
    });
    it("is correctly rendered in korean", () => {
      const wrapper = setup({ language: "kor" });
      const inputControl = findByTestAttr(wrapper, "input-control");
      expect(inputControl.prop("placeholder")).toMatch(/단어/);
    });
  });
});

test("App renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

it("does not throw warning with expected props", () => {
  const conformingProps = { secretWord: "piano" };
  checkProps(Input, conformingProps);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn(),
    wrapper;
  beforeEach(() => {
    // clear the results from the last test.
    mockSetCurrentGuess.mockClear();
    // replace useState with mock function
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test("state updates with value of input control upon change", () => {
    const inputControl = findByTestAttr(wrapper, "input-control");
    const mockEvent = { target: { value: "conga" } };
    inputControl.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("conga");
  });
  test("state resets to empty string on submit", () => {
    const form = findByTestAttr(wrapper, "form");
    const mockEvent = {
      target: { value: "" },
      preventDefault: () => {}
    };
    form.simulate("submit", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
