import stringsModule from './strings';

// destructuring because we won't be mocking it.
const { getStringByLanguage } = stringsModule;

// Creating controlled version of strings obj for testing
// because we're testing 'getStringByLanguage' function
// not the strings.
const strings = {
  eng: { submit: 'submit' },
  kor: { submit: '제출' },
  elvish: {}
};

it('returns correct submit string for english', () => {
  const string = getStringByLanguage('eng', 'submit', strings);
  expect(string).toBe('submit');
});
it('returns correct submit string for korean', () => {
  const string = getStringByLanguage('kor', 'submit', strings);
  expect(string).toBe('제출');
});
it('returns english submit string when language does not exist', () => {
  const string = getStringByLanguage('python', 'submit', strings);
  expect(string).toBe('submit');
});
it('returns english submit string when submit key does not exist for the language', () => {
  const string = getStringByLanguage('elvish', 'submit', strings);
  expect(string).toBe('submit');
});
