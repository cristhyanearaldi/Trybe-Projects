### Requisitos do Projeto

`Requisitos obrigatórios:`
- [1 - Adicione no seu site um título com o nome do seu jogo](#1---adicione-no-seu-site-um-título-com-o-nome-do-seu-jogo)
- [2 - Adicione um texto com o código RGB a ser adivinhado](#2---adicione-um-texto-com-o-código-rgb-a-ser-adivinhado)
- [3 - Adicione a página opções de cores para serem adivinhadas](#3---adicione-a-página-opções-de-cores-para-serem-adivinhadas)
- [4 - Adicione cores nas bolas elas devem ser geradas dinâmicamente](#4---adicione-cores-nas-bolas-elas-devem-ser-geradas-dinâmicamente)
- [5 - Clicar em um circulo colorido, deve ser mostrado um texto indicando se está correto](#5---clicar-em-um-circulo-colorido-deve-ser-mostrado-um-texto-indicando-se-está-correto)
- [6 - Crie um botão para iniciar/reiniciar o jogo](#6---crie-um-botão-para-iniciarreiniciar-o-jogo)

`Requisitos bônus:`
- [7 - Crie um placar que incremente 3 pontos para cada acerto no jogo](#7---crie-um-placar-que-incremente-3-pontos-para-cada-acerto-no-jogo)
---


### 1 - Adicione no seu site um título com o nome do seu jogo

- Será verificado se o **id** do título é `title`.

### 2 - Adicione um texto com o código RGB a ser adivinhado

- Será verificado se o seu id deve ser rgb-color;

- Será verificado se o texto deve conter os três números das cores RGB a ser adivinhada, no seguinte formato: `(168, 34, 1)`.

### 3 - Adicione à página opções de cores para serem adivinhadas

- Será verificado que deve conter 6 circulos como opção de cor de adivinhação;

- Será verificado que a class de todos os circulos deve ser ball.

### 4 - Adicione cores nas bolas, elas devem ser geradas dinâmicamente

- Será verificado que ao carregar a página, as cores de cada um dos 6 circulos coloridos devem ser geradas via JavaScript.

### 5 - Clicar em um circulo colorido, deve ser mostrado um texto indicando se está correto

- Será verificado que o **id** do elemento deve ser `answer`;

- Será verificado que quando o jogo é iniciado, o texto exibido deve ser `"Escolha uma cor"`;

- Será verificado se o circulo colorido for o **correto**, deve ser exibido o texto "Acertou!";

- Será verificado se o circulo colorido for o **incorreto**, deve ser exibido o texto "Errou! Tente novamente!".

### 6 - Crie um botão para iniciar/reiniciar o jogo


- Será verificado que o botão deve ter o id reset-game;

- Será verificado que ao clicar no botão, novas cores devem ser geradas via JavaScript e o elemento rgb-color deve ser atualizado;

- Será verificado que ao clicar no botão, o elemento answer deve voltar ao estado inicial, exibindo o texto "Escolha uma cor".

## BÔNUS

### 7 - Crie um placar que incremente 3 pontos para cada acerto no jogo


- Será verificado que o elemento deve ter o **id** `score`;

- Será verificado que o valor inicial dele deve ser 0;

- Será verificado que a cada acerto, é incrementado 3 pontos ao placar;

- Será verificado que ao clicar no botão reiniciar, o placar NÃO deve ser resetado.

---


