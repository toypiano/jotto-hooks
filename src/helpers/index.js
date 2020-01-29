export const getLetterMatchCount = (guess, secretWord) => {
  const letterSet = new Set(secretWord.split(""));
  const matchingLetters = [...letterSet].filter(letter =>
    guess.includes(letter)
  );
  return matchingLetters.length;
};
