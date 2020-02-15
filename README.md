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

### Testing getSecretWord in App component

- Create `actions/hookActions.js` (wouldn't this be a custom hook?)
- Create a function that takes `setSecretWord`
  - and gets secret word from the server
  - then run `setSecretWord` with result
- Default export object with all the actions from `hookActions.js` for mocking
- We will use axios and moxios

> Note: We're not testing `useEffect`, but only testing whether the function inside useEffect is doing its job.

- To test that `getSecretWord` doesn't run on update, we'll trigger an update with Enzyme `setProps()`
  - `update()` doesn't trigger `useEffect()`
  - `update()` syncs the enzyme component tree snapshot with the react component tree. But it does not force re-render on react's side.

### Testing spinner

- Update `setup` to take `secretWord`
- mock `useReducer` to:
  - set value of secret word (to use in the test)
  - pass jest mock as dispatch (check if blank function works too)

### Language context

- `[language, setLanguage] = useState("english")` in App component
- pass in `setLanguage` as a prop to `LanguagePicker` component
- Export `languageContext` from `./src/contexts/languageContext.js`
- Wrap App's children in `languageContext.Provider`
- Provider updates children when value changes.
- Import `languageContext` in component files and use `useContext()` to consume context value.

### Strings file

- Object with strings in each language (strings "database")
- Function(languageCode, key) => strings in that language
- Unknown code / key:
  - console.log warning
  - use default language

### Writing Context Tests: 2 options

- Mock `useContext`
  - mock return value sets `language` value
  - **Pros**
    - isolated unit test
    - doesn't rely on other functionality
    - use shallow (isolate from child component)
  - **Cons**
    - test becomes brittle when mocking multiple useContext
    - have to match order of useContext's where they are used.
    - not relevant for custom hook/ internal state pattern
- Wrap component in `Provider` in setup

  - hard-code `language` value with `value` prop
  - **Props**
    - closer to actual app
    - `Provider` is unlikely to fail
  - **Cons**
    - need to use mount
    - shallow only returns `Provider`
    - component's children can affect the test result
    - cannot test the actual "default" `language` value because we're hard-coding it with a value for the test.

- When/ Which to use?
  - Providers in setup and mount:
    - Simple app where components are not deeply nested
  - Mock useContext + shallow:
    - For more complicated app
