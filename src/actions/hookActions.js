import axios from 'axios';

export const getSecretWord = async setSecretWord => {
  const response = await axios.get(
    'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=200&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=uq83m5wz8kd5av5wnpbgsjox6piw2widav43epjzhlqd4m8ro'
  );
  setSecretWord(response.data.word);
};

// default export for mocking convenience
export default { getSecretWord };
