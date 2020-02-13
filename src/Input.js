import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-control"
          className="form-control"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button data-test="submit-button" className="btn btn-primary">
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
