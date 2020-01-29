import React from "react";
import PropTypes from "prop-types";

const GuessedWords = props => {
  const guessedWordsRows = props.guessedWords.map((obj, i) => {
    return (
      <tr data-test="guessed-word" key={obj.guessedWord + i}>
        <td>{obj.guessedWord}</td>
        <id>{obj.letterMatchCount}</id>
      </tr>
    );
  });

  const content =
    props.guessedWords.length === 0 ? (
      <div className="card" data-test="guess-instructions">
        Try to guess the secret word!
      </div>
    ) : (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  return <div data-test="component-guessed-words">{content}</div>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
};
export default GuessedWords;
