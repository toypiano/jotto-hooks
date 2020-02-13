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

- Mocking `useContext` will work

```jsx
import React from 'react';

const language = React.useContext(LanguageContext);
```

- Mocking `useContext` will **not** work

```jsx
import { useContext } from 'react';
const language = useContext(languageContext);
```
