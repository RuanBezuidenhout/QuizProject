const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let quiestionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'An organic compound is considered an alochol if it has what functional group?',
    choice1: 'Carbonyl',
    choice2: 'Hydroxyl',
    choice3: 'Alkyl',
    choice4: 'Aldehyde',
    answer: 2,
  },
  {
    question: 'Where is the tallest building located?',
    choice1: 'New York',
    choice2: 'Dubai',
    choice3: 'England',
    choice4: 'South Africa',
    answer: 1,
  },
  {
    question: 'Whats is the largest country in the world?',
    choice1: 'Canada',
    choice2: 'United States',
    choice3: 'Russia',
    choice4: 'China',
    answer: 3,
  },
  {
    question: 'How far is the Moon from the Earth?',
    choice1: '11000 km',
    choice2: '97 360 km',
    choice3: '384 400 km',
    choice4: '569 600 km',
    answer: 3,
  },
]

const SCORE_POINTS = 100
const MAX_QEUSTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QEUSTIONS){
    localStorage.setItem('mostResentScore', score)
    return window.location.assign('end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QEUSTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QEUSTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e =>{
  if(!acceptingAnswers) return
  acceptingAnswers = false
  const selectedChoice = e.target
  const selectedAnswer = selectedChoice.dataset['number']
  let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :'incorrect'

  if(classToApply === 'correct'){
    incrementScore(SCORE_POINTS)
  }
  selectedChoice.parentElement.classList.add(classToApply)
  setTimeout (() => {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
  }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()
