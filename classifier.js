// classifier.js
export class Classifier {
  constructor() {
    // Create a new neural network using brain.js
    this.net = new brain.NeuralNetwork();
  }

  // Train the neural network using training data.
  // Training data should be an array of objects with `input` and `output` keys.
  train(trainingData) {
    this.net.train(trainingData, {
      iterations: 200,
      errorThresh: 0.005,
      log: true,
      logPeriod: 50,
    });
  }

  // Classify a preprocessed input (bag-of-words object)
  classify(input) {
    const output = this.net.run(input);
    let sentiment = 'Neutral';
    // Choose the key with the highest value
    const keys = Object.keys(output);
    if (keys.length) {
      let highestKey = keys[0];
      keys.forEach(key => {
        if (output[key] > output[highestKey]) {
          highestKey = key;
        }
      });
      sentiment = this.capitalize(highestKey);
    }
    return sentiment;
  }

  // Load a pre-trained model from JSON data
  loadModel(modelData) {
    this.net.fromJSON(modelData);
  }

  // Export the current model as a JSON object
  exportModel() {
    return this.net.toJSON();
  }

  // Utility to capitalize a word
  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
