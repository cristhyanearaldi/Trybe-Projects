let colorNumber = '';
const ball = document.getElementsByClassName('ball');

function generateColors() {
  // para gerar a bola com a cor especificada em 'rgb-color' (cor correta):
  const red = (Math.ceil(Math.random() * 255)).toString();
  const green = (Math.ceil(Math.random() * 255)).toString();
  const blue = (Math.ceil(Math.random() * 255)).toString();
  const number = '(' + red + ', ' + green + ', ' + blue + ')';
  colorNumber = 'rgb' + number;
  ball[(Math.round(Math.random() * 5))].style.backgroundColor = colorNumber;
  const rgbColor = document.getElementById('rgb-color');
  // escrevendo o rgb da cor correta:
  rgbColor.innerText = number;
  
  // gerar as demais cores e aplicá-las nas bolas restantes:
  for (let index = 0; index < ball.length; index += 1) {
    if (ball[index].style.backgroundColor !== colorNumber) {
      const red = (Math.ceil(Math.random() * 255)).toString();
      const green = (Math.ceil(Math.random() * 255)).toString();
      const blue = (Math.ceil(Math.random() * 255)).toString();
      ball[index].style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
  } 
}
window.onload = generateColors();
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// requisito 5 - Clicar em um círculo colorido, deve ser mostrado um texto indicando se está correto
//requisito 7 - Crie um placar que incremente 3 pontos para cada acerto no jogo
const answer = document.getElementById('answer');
const rgbColor = document.getElementById('rgb-color');
const score = document.getElementById('score');
score.innerText = 'Placar: ' + 0;
let sum = 0;

for (let i = 0; i < ball.length; i += 1) {
  ball[i].addEventListener('click', colorEvaluation);
}

function colorEvaluation(event) {
  if (event.target.style.backgroundColor === colorNumber) {
    answer.innerText = 'Acertou!';
    sum += 3;
    score.innerText = 'Placar: ' + sum;
  } else {
    answer.innerText = 'Errou! Tente novamente!';
  }
}

// requisito 6 - Crie um botão para iniciar/reiniciar o jogo
const resetGame = document.getElementById('reset-game');
resetGame.addEventListener('click', resetColors);

function resetColors() {
  generateColors();
  answer.innerText = 'Escolha uma cor';
}
