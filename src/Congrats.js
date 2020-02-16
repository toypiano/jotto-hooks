import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModules from "./helpers/strings";

const Congrats = props => {
  const language = React.useContext(languageContext);
  const congrats = props.success ? (
    <div
      data-test="component-congrats"
      className="alert alert-success"
    >
      <span data-test="congrats-message">
        {stringsModules.getStringByLanguage(language, "congrats")}
      </span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );

  return congrats;
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;
