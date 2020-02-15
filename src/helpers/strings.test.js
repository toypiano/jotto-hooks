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
describe('getStringByLanguage function', () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    // so that our tests don't give us warnings;
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    console.warn = originalWarn;
  });
  it('returns correct submit string for english', () => {
    const string = getStringByLanguage('eng', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it('returns correct submit string for korean', () => {
    const string = getStringByLanguage('kor', 'submit', strings);
    expect(string).toBe('제출');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it('returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('python', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [python]'
    );
  });
  it('returns english submit string when submit key does not exist for the language', () => {
    const string = getStringByLanguage('elvish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [elvish]'
    );
  });
});
