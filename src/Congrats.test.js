import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "./Congrats";
import languageContext from "./contexts/languageContext";

const defaultProps = { success: false };

// we'll get success from context
const setup = ({ success, language }) => {
  language = language || "eng"; // if not specified, default to 'eng'
  success = success || false; // if falsy or false, set to false
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={success} />
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  it("correctly renders congrats string in english", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toMatch(/congratulations/i);
  });
  it("correctly renders congrats string in korean", () => {
    const wrapper = setup({ success: true, language: "kor" });
    expect(wrapper.text()).toMatch(/정답/);
  });
});

describe("render", () => {
  let wrapper, component;
  beforeEach(() => {
    // without the empty obj passed in, setup will throw TypeError
    wrapper = setup({});
    component = findByTestAttr(wrapper, "component-congrats");
  });
  test("renders without error", () => {
    expect(component.length).toBe(1);
  });
  test("renders no text when 'success' prop is false", () => {
    expect(component.text().length).toBe(0);
  });
  test("renders non-empty congrats message when 'success' prop is true", () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, "congrats-message");
    expect(message.text().length).toBeGreaterThan(0);
  });
});

test("does no throw warning with expected props", () => {
  const expectedProps = defaultProps;
  checkProps(Congrats, expectedProps);
});
