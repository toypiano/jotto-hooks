import React from 'react';
import './App.css';

import hookActions from './actions/hookActions';

// App.test will swap hookActions.getSecretWord with mock here

// state is updated when dispatch is called with action
function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const initialState = { secretWord: null };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // dispatch action with secretWord
  const setSecretWord = secretWord =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(
    // call API and run setSecretWord passing response.data
    () => {
      hookActions.getSecretWord(setSecretWord);
    },
    [] // this will only run once on mount and not on re-render
  );
  return <div data-test="component-app"></div>;
}

export default App;
