import React from 'react';
import './App.css';
import Input from './Input';

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

  if (!state.secretWord) {
    return (
      <div data-test="spinner" className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }
  return (
    <div data-test="component-app" className="container text-center">
      <Input secretWord={state.secretWord} />
    </div>
  );
}

export default App;
