const btnCriarTarefa = document.getElementById('criar-tarefa');
const inputTextoTarefa = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

btnCriarTarefa.addEventListener('click', adicionaTexto);

function adicionaTexto() {
  const texto = inputTextoTarefa.value;
  const itemLista = document.createElement('li');
  itemLista.innerText = texto;
  listaTarefas.appendChild(itemLista);
  inputTextoTarefa.value = '';
}

// Altera cor de fundo ao clicar
listaTarefas.addEventListener('click', alteraCor);

function alteraCor(event) {
  resetaCor();
  event.target.classList.toggle('clicked');
}
// Source: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList

// Somente um elemento selecionado por vez
function resetaCor() {
  const grayItens = document.getElementsByClassName('clicked');
  for (let index = 0; index < grayItens.length; index += 0) {
    grayItens[index].classList.remove('clicked');
  }
}

// Risca elemento com duplo click
listaTarefas.addEventListener('dblclick', riscaElemento);
function riscaElemento(event) {
  event.target.classList.toggle('completed');
}

// Apaga todos os itens da lista
const apagaTudo = document.getElementById('apaga-tudo');
apagaTudo.addEventListener('click', apagaLista);
function apagaLista() {
  listaTarefas.innerText = '';
}

// Apaga os itens finalizados (riscados)
const removerFinalizados = document.getElementById('remover-finalizados');
const completos = document.getElementsByClassName('completed');

removerFinalizados.addEventListener('click', apagaCompletos);

function apagaCompletos() {
  for (let i = 0; i < completos.length; i += 0) {
    completos[i].remove();
  }
}
apagaCompletos();

// Apaga os itens selecionados (background cinza)
const removerSelecionado = document.getElementById('remover-selecionado');
const selecionado = document.getElementsByClassName('clicked');

removerSelecionado.addEventListener('click', apagaSelecionado);

function apagaSelecionado() {
  selecionado[0].remove();
}