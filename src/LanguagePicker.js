import React from 'react';
import PropTypes from 'prop-types';

function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: 'eng', symbol: '\u{1F1EC}\u{1F1E7}' },
    { code: 'kor', symbol: '\u{1F1F0}\u{1F1F7}' }
  ];

  const languageIcons = languages.map(lang => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return (
    <div data-test="component-language-picker">{languageIcons}</div>
  );
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired
};

export default LanguagePicker;
