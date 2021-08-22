// Requisito 7 - Clicar em uma das cores da paleta faz com que ela seja selecionada e utilizada para preencher os pixels no quadro.

const color = document.getElementsByClassName('color');
const colorPalette = document.querySelector('#color-palette');

colorPalette.addEventListener('click', colorSelection);

function colorSelection(event){ // aqui tem que passar o event para verificar qual a cor selecionada
  for (let i = 0; i < color.length; i += 1) {
    color[i].classList.remove('selected'); // significa que da lista de classes (.classList) que a variável color tem (classe chamada foi .color), vou remover 'selected'
    event.target.classList.add('selected'); // pega o elemento que está disparando o evento e adiciona, na lista de classes desse elemento, a classe 'selected'
  }
}

// Requisito 8 - Clicar em um pixel dentro do quadro após selecionar uma cor na paleta faz com que o pixel seja preenchido com a cor selecionada

const pixel = document.getElementsByClassName('pixel');

function fillPixel() {
  for (let j = 0; j < pixel.length; j += 1) {
    pixel[j].addEventListener('click', fill);
    
    function fill (event){
      const selected = document.querySelector('.selected');
      const clickedColor = window.getComputedStyle(selected).backgroundColor;// obtém o valor da propriedade backgrounColor do elemento
      event.target.style.backgroundColor = clickedColor; // pega o elemento que está disparando o evento e atibui o background na cor selecionada
    }
  }
}
fillPixel();
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
// Source: https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp
// Source: https://stackoverflow.com/questions/1887104/how-to-get-the-background-color-of-an-html-element
// Source: https://www.codegrepper.com/code-examples/javascript/event.target.classlist
// Source: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList

// Requisito 9 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco

const clearBoard = document.getElementById('clear-board');
clearBoard.addEventListener('click', clear);

function clear() {
  for (let k = 0; k < pixel.length; k += 1) {
    pixel[k].style.backgroundColor = 'white';
  }
}