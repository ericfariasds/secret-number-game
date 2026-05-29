// Configurações gerais do jogo — altere aqui para ajustar as regras
const CONFIG = {
    numeroLimite: 15,
    tentativasMaximas: 5,
};

// SISTEMA DE TRADUÇÃO
let idiomaAtual = 'pt';
 
const TEXTOS = {
    pt: {
        langBtn:          '🌐 Translate to English',
        titulo:           'Jogo do Número Secreto',
        instrucao:        (limite) => `Escolha um número entre 1 e ${limite}`,
        placeholder:      'Digite seu chute...',
        btnChutar:        'Chutar',
        btnReiniciar:     'Novo jogo',
        parabens:         'Parabéns, você acertou!',
        descobriu:        (t, pal) => `Você descobriu o número secreto com ${t} ${pal}!`,
        tentativa:        'tentativa',
        tentativas:       'tentativas',
        maior:            'O número secreto é maior',
        menor:            'O número secreto é menor',
        perdeu:           'Que pena, você perdeu!',
        numeroEra:        (n) => `O número secreto era ${n}.`,
        digitaValido:     'Por favor, digite um número válido!',
        foraDaFaixa:      (limite) => `Digite um número entre 1 e ${limite}!`,
    },
    en: {
        langBtn:          '🌐 Traduzir para português',
        titulo:           'Secret Number Game',
        instrucao:        (limite) => `Choose a number between 1 and ${limite}`,
        placeholder:      'Type your guess...',
        btnChutar:        'Guess',
        btnReiniciar:     'New game',
        parabens:         'Congrats, you got it!',
        descobriu:        (t, pal) => `You found the secret number in ${t} ${pal}!`,
        tentativa:        'attempt',
        tentativas:       'attempts',
        maior:            'The secret number is higher',
        menor:            'The secret number is lower',
        perdeu:           'Too bad, you lost!',
        numeroEra:        (n) => `The secret number was ${n}.`,
        digitaValido:     'Please enter a valid number!',
        foraDaFaixa:      (limite) => `Enter a number between 1 and ${limite}!`,
    }
};
 
// Retorna o objeto de textos do idioma atual
function t() {
    return TEXTOS[idiomaAtual];
}
 
// Alterna entre PT e EN e atualiza todos os textos fixos da interface
function alternarIdioma() {
    idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
 
    // Atualiza o botão de idioma
    document.getElementById('lang-btn').textContent = t().langBtn;
 
    // Atualiza placeholder do input
    document.querySelector('input').placeholder = t().placeholder;
 
    // Atualiza botões
    document.querySelector('.container__botao--chutar').textContent = t().btnChutar;
    document.getElementById('reiniciar').textContent = t().btnReiniciar;
 
    // Re-exibe a mensagem atual na tela (título e parágrafo)
    atualizarMensagemAtual();
}
 
// Guarda o estado da mensagem atual para reexibir no idioma certo ao trocar
let estadoMensagem = 'inicial'; // 'inicial' | 'acertou' | 'perdeu' | 'maior' | 'menor' | 'invalido' | 'foraDaFaixa'
 
function atualizarMensagemAtual() {
    switch (estadoMensagem) {
        case 'inicial':
            exibirTextoNaTela('h1', t().titulo);
            exibirTextoNaTela('p', t().instrucao(CONFIG.numeroLimite));
            break;
        case 'acertou':
            const palavraTentativa = tentativas === 1 ? t().tentativa : t().tentativas;
            exibirTextoNaTela('h1', t().parabens);
            exibirTextoNaTela('p', t().descobriu(tentativas, palavraTentativa));
            break;
        case 'perdeu':
            exibirTextoNaTela('h1', t().perdeu);
            exibirTextoNaTela('p', t().numeroEra(numeroSecreto));
            break;
        case 'maior':
            exibirTextoNaTela('p', t().maior);
            break;
        case 'menor':
            exibirTextoNaTela('p', t().menor);
            break;
        case 'invalido':
            exibirTextoNaTela('p', t().digitaValido);
            break;
        case 'foraDaFaixa':
            exibirTextoNaTela('p', t().foraDaFaixa(CONFIG.numeroLimite));
            break;
    }
}

// Variáveis de estado do jogo
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Atualiza o conteúdo de um elemento HTML pelo seletor (tag, classe ou id)
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    if (campo) campo.innerHTML = texto;
}

// Exibe o título e a instrução iniciais na tela
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${CONFIG.numeroLimite}`);
}

exibirMensagemInicial();

// Verifica se o chute do jogador está correto e atualiza o estado do jogo
function verificarChute() {
    const input = document.querySelector('input');
    const chute = parseInt(input.value);

    if (!validarChute(chute)) return;

    if (chute === numeroSecreto) {
        const palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('.container__botao--chutar').setAttribute('disabled', true);
        input.setAttribute('disabled', true);
        adicionarEfeitoVitoria();
    } else {
        // Dá uma dica se o número secreto é maior ou menor
        const dica = chute > numeroSecreto
            ? 'O número secreto é menor'
            : 'O número secreto é maior';
        exibirTextoNaTela('p', dica);
        tentativas++;
        limparCampo();

        // Encerra o jogo se o jogador esgotou as tentativas
        if (CONFIG.tentativasMaximas && tentativas > CONFIG.tentativasMaximas) {
            exibirTextoNaTela('h1', 'Que pena, você perdeu!');
            exibirTextoNaTela('p', `O número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('.container__botao--chutar').setAttribute('disabled', true);
            document.querySelector('input').setAttribute('disabled', true);
        }
    }
}

// Valida se o chute é um número dentro do intervalo permitido
function validarChute(chute) {
    if (isNaN(chute) || document.querySelector('input').value === '') {
        exibirTextoNaTela('p', 'Por favor, digite um número válido!');
        return false;
    }
    if (chute < 1 || chute > CONFIG.numeroLimite) {
        exibirTextoNaTela('p', `Digite um número entre 1 e ${CONFIG.numeroLimite}!`);
        limparCampo();
        return false;
    }
    return true;
}

// Gera um número aleatório sem repetir os já sorteados (usa recursão)
function gerarNumeroAleatorio() {
    if (listaDeNumerosSorteados.length === CONFIG.numeroLimite) {
        listaDeNumerosSorteados = []; // Reinicia a lista quando todos os números forem usados
    }

    const numeroEscolhido = parseInt(Math.random() * CONFIG.numeroLimite + 1);

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }

    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

// Limpa o campo de input e mantém o foco para o próximo chute
function limparCampo() {
    const input = document.querySelector('input');
    input.value = '';
    input.focus();
}

// Aplica a animação visual de vitória no container principal
function adicionarEfeitoVitoria() {
    const container = document.querySelector('.container');
    container.classList.add('vitoria');
    setTimeout(() => container.classList.remove('vitoria'), 1500);
}

// Reinicia todas as variáveis e a interface para uma nova rodada
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.querySelector('.container__botao--chutar').removeAttribute('disabled');
    document.querySelector('input').removeAttribute('disabled');
    document.querySelector('.container').classList.remove('vitoria');
}

// Permite confirmar o chute pressionando Enter, sem precisar clicar no botão
document.querySelector('input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verificarChute();
});