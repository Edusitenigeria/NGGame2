document.addEventListener("DOMContentLoaded", function () {
  const scoreElement = document.querySelector(".score");
  const questionElement = document.querySelector(".question"); // Get the question element by class

  const array = {
    "a number that begins with F and ends with E": 5,
    "a number that begins with S and ends with EN": 7,
    "a number when added twice and subtracted by 3 = 11": 7,
    "a number when multiplied by 5 equals 25": 5,
    "a number added by 2 and divided by 10 equals 1.8": 16,
    "Can you guess a number i'm thinking of? it's divisible by both 3 and 5": 15,
    "Guess a number between 1 and 10": 4,
    "Guess the mystery number between 1 and 100 in five tries": 9,
  };

  let currentQuestion = "";
  let score = 0;

  function generateRandomIndex() {
    // Generate a random index between 0 and the length of the array
    return Math.floor(Math.random() * Object.keys(array).length);
  }

  function showNextQuestion() {
    // Generate a new random index and ensure it's different from the current one
    let randomIndex = generateRandomIndex();
    while (currentQuestion === Object.keys(array)[randomIndex]) {
      randomIndex = generateRandomIndex();
    }

    // Update the content of the question element with the selected question
    currentQuestion = Object.keys(array)[randomIndex];
    questionElement.textContent = currentQuestion;

    // Show the "Submit" button and hide the "Start" button
    document.querySelector("#number").style.display = "block";
    document.querySelector(".Btn").style.display = "block";
    document.getElementById("start").style.display = "none";

    // Store the correct answer corresponding to the selected question
    const correctAnswer = array[currentQuestion];

    // Store the correct answer in a data attribute on the input element
    document.getElementById("number").dataset.correctAnswer = correctAnswer;
  }

  document.getElementById("start").addEventListener("click", showNextQuestion);

  document.querySelector(".Btn").addEventListener("click", function () {
    // Get the user's guess from the input field
    const userGuess = parseInt(document.getElementById("number").value, 10);

    // Get the correct answer from the data attribute of the input element
    const correctAnswer = parseInt(
      document.getElementById("number").dataset.correctAnswer,
      10
    );

    // Check if the user's guess is correct
    if (userGuess === correctAnswer) {
      // Display a success message
      document.querySelector(".hint").textContent =
        "Congratulations! Your guess is correct.";
      // Hide the "Submit" button and show the "Guess Again" button
      document.querySelector(".Btn").style.display = "none";
      document.querySelector(".reGuessBtn").style.display = "block";

      score + 2; // Increment the score
      scoreElement.textContent = `Score: ${score}`; // Update the score display on the web page
    } else {
      // Display a hint or an incorrect message
      document.querySelector(".hint").textContent = "Try Again!";
    }
  });

  // Handle the "Guess Again" button click
  document.querySelector(".reGuessBtn").addEventListener("click", function () {
    // Clear the input field
    document.getElementById("number").value = "";
    // Hide the "Guess Again" button and show the "Start" button
    document.querySelector(".reGuessBtn").style.display = "none";
    document.getElementById("start").style.display = "block";
    // Clear the hint message
    document.querySelector(".hint").textContent = "";
    // Clear the question
    questionElement.textContent = "";

    // Show the next question
    showNextQuestion();
  });
});
