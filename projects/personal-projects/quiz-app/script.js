import { questions } from "./questions.js"

let startIndex = 0;
let current = 0;
let score = 0;
let respondeu = false;

const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
const btnNext = document.getElementById('btn')
const scoreEl = document.getElementById('score')
const currentEl = document.getElementById('current')
const background = document.querySelector('.background')


function mostrarPergunta() {
    respondeu = false;
    const currentQuestion = questions[current]

    questionEl.textContent = currentQuestion.question;
    // answersEl.textContent = currentQuestion.answers;

    answersEl.innerHTML = '';

    questions[current].answers.forEach((AnswersEll, index) =>{
        const botao = document.createElement('button');
        botao.classList.add('botao');
        botao.textContent = `${index + 1}) ${AnswersEll}`
        document.getElementById('answers').appendChild(botao);

        botao.addEventListener('click', () =>{
            if (respondeu) return;
             respondeu = true;

            if (index === questions[current].correct){
                botao.classList.add("correto")
                score++;
                scoreEl.textContent = `Pontuação: ${score}`;
            } else{
                botao.classList.add("errou")
            }
        })
    })
    currentEl.textContent = `Pergunta ${current + 1} de ${questions.length}` 
}
btnNext.addEventListener('click', () =>{
        current++;
        if(current < questions.length){
            mostrarPergunta();
        } else{
            questionEl.textContent = 'Quiz finalizado!'
            answersEl.innerHTML = '';
        }
        
    })
mostrarPergunta();

function criarLogo() {
    const logo = document.createElement("img");

    logo.src = "./img/konoha.png";
    logo.classList.add("konoha");

    // posição aleatória na altura
    logo.style.top = Math.random() * 90 + "%";

    // tamanho aleatório
    logo.style.width = (60 + Math.random() * 40) + "px";

    background.appendChild(logo);

    // remove quando terminar a animação
    logo.addEventListener("animationend", () => {
        logo.remove();
    });
}

setInterval(criarLogo, 2000);

/* 
                                    Próximas implementações

1 - Criar uma estrutura `if/else` para identificar em qual pergunta o usuário está.
2 - Exibir as alternativas como "A, B, C" em vez de "1, 2, 3".
3 - Alterar a cor do cabelo do personagem no container de pontuação de acordo com a pontuação.
4 - Adicionar efeitos visuais ao acertar e ao errar uma resposta.
*/
console.log(background);