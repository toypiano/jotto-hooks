# Jotto Hooks and Context

TDD with Jest and Enzyme using React Hooks and Context API

## Jest Mocks

### Mocks serves three purposes

- Keep real function from running
  - prevent side-effects like network calls
- Spy on function to see when it's called with what arguments
- Provide return values

  - set up test conditions

### No destructuring on imports

Jest resets properties on modules to replace functions with mocks

```jsx
let mockSetCurrentGuess = jest.fn(),
  wrapper;
beforeEach(() => {
  // clear the results from the last test.
  mockSetCurrentGuess.mockClear();
  // replace useState with mock function
  React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
  wrapper = setup();
});
```

- Mocking `useContext` will work

```jsx
import React from 'react';

// Swap!

// Now React.useContext is pointing at the mock function
const language = React.useContext(LanguageContext);
```

- Mocking `useContext` will **not** work

```jsx
import React, { useContext } from 'react';

// Swap!

// Our mock function is at React.useContext
// But useContext is pointing at the real one from 'react'
const language = useContext(languageContext);
```

### Plan for testing getSecretWord in App component

- Create `actions/hookActions.js` (wouldn't this be a custom hook?)
- Create a function that takes `setSecretWord`
  - and gets secret word from the server
  - then run `setSecretWord` with result
- Default export object with all the actions from `hookActions.js` for mocking
- We will use axios and moxios
