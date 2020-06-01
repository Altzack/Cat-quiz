let score = 0;
let questionNumber = 0;

function startPage() {
  $('.altBox').hide();
}

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return renderQuestion(questionNumber);
  }
  $('.questionBox').hide();
  finalScore();
  $('.questionNumber').text(5);
}

function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', (e) => {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

function updateScore() {
  score++;
  $('.score').text(score);
}
function submitAnswer() {
  $('.bkgBox').on('submit', (e) => {
    e.preventDefault();
    $('.altBox').hide();
    $('response').show();
    const selected = $('input:checked');
    const answer = selected.val();
    const correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

function nextQuestion() {
  $('.bkgBox').on('click', '.nextButton', (e) => {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

function restartQuiz() {
  $('.bkgBox').on('click', '.restartButton', (e) => {
    e.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

function renderQuestion(questionIndex) {
  const formMaker = $(`
<form>
<fieldset> 
<legend class="questionText">${STORE[questionIndex].question}</legend>
</fieldset>
</form>`);

  const fieldSelector = $(formMaker).find('fieldset');
  STORE[questionIndex].answers.forEach((answerValue, answerIndex) => {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(
    '<button type="submit" class="submitButton button"> Submit</button > ',
  ).appendTo(fieldSelector);
  return formMaker;
}

function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <img src="images/coolcat.jpg" alt="cat wearing glasses" class="images" width="200px">
      <p class="sizeMe">Nice one!</p>
      <button type="button" class="nextButton button">Next</button>`,
  );
  $('.response').show();
  updateScore();
}

function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <img src="images/grumpy.jpg" alt="grump cat" class="images" width="200px">
    <p class="sizeMe">Correct answer:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`,
  );
  $('.response').show();
}
function finalScore() {
  $('.final').show();
  // if (score <= 3) {
  //   return
  // }

  return $('.final').html(`
    <h3>Your score is ${score}/5</h3>
     <button type="submit" class="restartButton button">Restart</button>`);
}
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
  startPage();
}

$(makeQuiz);
