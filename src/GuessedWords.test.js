import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }]
};
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("doesn't throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are no guessed word", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(
      wrapper,
      "guess-instructions"
    );
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are some guessed words", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 3 },
    { guessedWord: "party", letterMatchCount: 3 }
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders 'guessed words' section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("renders correct number of guessed words", () => {
    const guessedWordNode = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNode.length).toBe(guessedWords.length);
  });
});
