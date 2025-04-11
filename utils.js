// utils.js
export function preprocessText(text) {
  // Normalize text: lowercase and remove punctuation
  const cleanText = text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleanText.split(' ');
  const bag = {};

  words.forEach(word => {
    bag[word] = (bag[word] || 0) + 1;
  });

  return bag;
}
