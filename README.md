# Jogo do Número Secreto

Um jogo interativo de adivinhação desenvolvido com HTML, CSS e JavaScript puro.

## Como jogar

1. O jogo sorteia um número secreto entre **1 e 10**
2. Digite seu chute no campo de entrada
3. Clique em **Chutar** (ou pressione **Enter**)
4. Você recebe dicas se o número é maior ou menor
5. Tente descobrir o número secreto com o menor número de tentativas possível!
6. Clique em **Novo jogo** para reiniciar

## Funcionalidades

- Geração aleatória sem repetição de números
- Dicas após cada tentativa errada
- Validação de entradas (campo vazio, fora do intervalo)
- Contador de tentativas com conjugação correta (1 tentativa / 2 tentativas)
- Atalho de teclado com a tecla **Enter**
- Animação visual ao acertar
- Limite de tentativas configurável
- Layout responsivo para mobile

## Tecnologias utilizadas

- HTML5
- CSS3 (Flexbox, animações, media queries)
- JavaScript (ES6+)

## Como executar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jogo-numero-secreto.git

# Entre na pasta
cd jogo-numero-secreto

# Abra o arquivo no navegador
open index.html
```

Ou simplesmente abra o arquivo `index.html` direto no navegador — sem necessidade de servidor!

## Estrutura do projeto

```
jogo-numero-secreto/
├── index.html
├── style.css
├── app.js
├── img/
│   ├── ia.png
│   └── code.png
└── README.md
```

## O que aprendi neste projeto

- Manipulação do DOM com JavaScript
- Lógica de controle de fluxo e recursividade
- Validação de formulários sem bibliotecas externas
- Organização de código com constantes de configuração
- Estilização responsiva com CSS puro

---

Desenvolvido como projeto de aprendizado em JavaScript