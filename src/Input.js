import React from "react";
import PropTypes from "prop-types";
import languageContext from "./contexts/languageContext";
import stringModules from "./helpers/strings";

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  // make sure you pass language to the initial state
  // where you mock useReducer

  const language = React.useContext(languageContext);

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
          placeholder={stringModules.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-3"
        >
          {stringModules.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
