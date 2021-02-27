const finalScore = document.querySelector('#finalScore')
const mostResentScore = localStorage.getItem('mostResentScore')

finalScore.innerText = mostResentScore

  const score = {
    score: mostResentScore,
  }
