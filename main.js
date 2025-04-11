// main.js
import { Classifier } from './classifier.js';
import { preprocessText } from './utils.js';

// Helper: Download a JSON file in the browser
function downloadJSON(data, filename = 'model.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Load external JSON files concurrently
async function loadJSON(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn(`Could not load ${filename}: ${error}`);
    return null;
  }
}

// Main initialization function
async function init() {
  // Load training data and existing model (if any)
  const trainingData = await loadJSON('trainingData.json');
  const modelData = await loadJSON('model.json');

  // Instantiate the classifier; if training data is available, pass it.
  const classifier = new Classifier();

  // If a non-empty model exists, load it.
  if (modelData && Object.keys(modelData).length > 0) {
    classifier.loadModel(modelData);
    console.log('Existing model loaded.');
  } else if (trainingData) {
    // Otherwise, train using the available training data
    classifier.train(trainingData);
    console.log('Classifier trained with trainingData.json.');
  } else {
    console.warn('No model or training data found.');
  }

  // Set up UI event listeners
  const classifyBtn = document.getElementById('classifyBtn');
  const trainBtn = document.getElementById('trainBtn');
  const inputText = document.getElementById('inputText');
  const resultDiv = document.getElementById('result');

  classifyBtn.addEventListener('click', () => {
    const text = inputText.value;
    if (text.trim() === '') {
      resultDiv.textContent = 'Please enter some text.';
      return;
    }
    const processedText = preprocessText(text);
    const sentiment = classifier.classify(processedText);
    resultDiv.textContent = `Sentiment: ${sentiment}`;
  });

  // Train and export model when "Train & Export Model" is clicked.
  trainBtn.addEventListener('click', () => {
    if (!trainingData) {
      resultDiv.textContent = 'No training data found.';
      return;
    }
    classifier.train(trainingData);
    const exportedModel = classifier.exportModel();
    downloadJSON(exportedModel);
    resultDiv.textContent = 'Model trained and exported!';
  });
}

init();
