const languageStrings = {
  eng: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters"
  },
  kor: {
    congrats: "짝짝짝! 정답입니다! ",
    submit: "제출",
    guessPrompt: "다섯글자 단어를 맞춰보세요!",
    guessInputPlaceholder: "단어를 입력하세요",
    guessColumnHeader: "입력한 단어들",
    guessedWords: "단어",
    matchingLettersColumnHeader: "일치하는 글자"
  }
};

// passing string object as param make it easier to test
// even if the string object is modified/updated
function getStringByLanguage(
  languageCode, // 'eng'
  stringKey, // 'submit'
  strings = languageStrings // string object - can be mocked for test
) {
  // defaults to eng[stringKey]
  // if no key in eng, returns undefined;
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    // because we use 'mount' in app.test and Provider takes
    // state.language returned from useReducer in App component
    // make sure the language is there when you initialize useReducer
    // if you mock useReducer in tests.

    console.warn(
      `Could not get string [${stringKey}] for [${languageCode}]`
    );
    return strings.eng[stringKey];
  }
  return strings[languageCode][stringKey];
}

// for future mocking
// e.g. strings.someFunc = jest.fn()
export default { getStringByLanguage };
