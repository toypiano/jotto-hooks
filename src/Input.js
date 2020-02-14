import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setCurrentGuess(e.target.value);
    // TODO: Update guessedWords context
    // TODO: Compare guessedWords against secretWord and optionally update success context
  };
  return (
    <div data-test="component-input" className="mt-5">
      <form
        data-test="form"
        className="form-inline"
        onSubmit={handleSubmit}
      >
        <input
          data-test="input-control"
          className="form-control mr-sm-2 mb-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
