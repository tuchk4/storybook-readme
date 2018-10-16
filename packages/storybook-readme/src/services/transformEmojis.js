import emoji from 'node-emoji';

const EMOJI_REGEXP = /:\+1:|:-1:|:[\w-]+:/g;

const transformEmojis = doc => {
  const resultMap = {};
  let result;

  while ((result = EMOJI_REGEXP.exec(doc)) !== null) {
    resultMap[result] = true;
  }

  Object.keys(resultMap).forEach(result => {
    doc = doc.replace(
      new RegExp(result, 'g'),
      emoji.get(result.replace(/:/g, ''))
    );
  });

  return doc;
};

export default transformEmojis;
