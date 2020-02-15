const languageStrings = {
  eng: {
    congrats: 'Congratulations! You guessed the word!',
    submit: 'Submit',
    guessPrompt: 'Try to guess the secret word!',
    guessInputPlaceholder: 'enter guess',
    guessColumnHeader: 'Guessed Words',
    guessedWords: 'Guesses',
    matchingLettersColumnHeader: 'Matching Letters'
  },
  kor: {
    congrats: '짝짝짝! 정답입니다! ',
    submit: '제출',
    guessPrompt: '다섯글자 단어를 맞춰보세요!',
    guessInputPlaceholder: '단어 입력',
    guessColumnHeader: '입력한 단어들',
    guessedWords: '단어',
    matchingLettersColumnHeader: '일치하는 글자'
  }
};

// passing string object as param make it easier to test
// even if the string object is modified/updated
function getStringByLanguage(
  languageCode, // 'eng'
  stringKey, // 'submit'
  strings = languageStrings // string object
) {}

// for future mocking
// e.g. strings.someFunc = jest.fn()
export default { getStringByLanguage };
