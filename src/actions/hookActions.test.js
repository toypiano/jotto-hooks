import moxios from 'moxios';

// ok to destructure getSecretAction because we aren't mocking it
// instead we are going to test the actual function.
import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'piano';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { word: secretWord } // wordnik api
      });
    });

    // create mock for callback arg
    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);

    // see whether mock was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
