// Initialize the app after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create an instance of your classifier
  const classifier = new Classifier();

  // Attempt to load a pre-trained model if available (from model.json)
  classifier.loadModel(); 

  // Set up UI event listeners
  const classifyBtn = document.getElementById('classifyBtn');
  const inputText = document.getElementById('inputText');
  const resultDiv = document.getElementById('result');

  classifyBtn.addEventListener('click', () => {
    const text = inputText.value;
    if (text.trim() === '') {
      resultDiv.textContent = 'Please enter some text.';
      return;
    }
    // Preprocess the text using our helper function
    const processedText = preprocessText(text);
    // Classify the processed text
    const sentiment = classifier.classify(processedText);
    resultDiv.textContent = `Sentiment: ${sentiment}`;
  });
});
