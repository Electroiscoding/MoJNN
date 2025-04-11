// Make sure brain.js is already loaded on the page (via CDN in index.html)

class Classifier {
  constructor() {
    // Create a new neural network instance
    this.net = new brain.NeuralNetwork();

    // Optionally, you could load training data dynamically
    // For example, if trainingData is available globally (from trainingData.json)
    if (typeof TRAINING_DATA !== 'undefined') {
      this.net.train(TRAINING_DATA, {
        iterations: 200,
        errorThresh: 0.005,
      });
    }
  }

  classify(input) {
    // Run the network on the preprocessed input
    const output = this.net.run(input);
    
    // Example: Assume output is an object with keys: positive, negative, neutral
    // and we choose the highest value as the prediction.
    let sentiment = 'Neutral';
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

  loadModel() {
    // Load a pre-trained model if available from a global variable MODEL_DATA.
    // MODEL_DATA should be an object from model.json loaded via a script tag or AJAX.
    if (typeof MODEL_DATA !== 'undefined' && Object.keys(MODEL_DATA).length > 0) {
      this.net.fromJSON(MODEL_DATA);
    }
  }

  exportModel() {
    // Export the current model as JSON (for saving to model.json)
    return this.net.toJSON();
  }
  
  // Utility method to capitalize sentiment names
  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

// Expose the Classifier class globally
window.Classifier = Classifier;
