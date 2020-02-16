import React from "react";
import PropTypes from "prop-types";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const GuessedWords = props => {
  const language = React.useContext(languageContext);
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
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </div>
    ) : (
      <div data-test="guessed-words">
        <h3>
          {stringsModule.getStringByLanguage(
            language,
            "guessedWords"
          )}
        </h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
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
