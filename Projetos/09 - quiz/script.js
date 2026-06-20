const question = [
    {
        question:'Naruto é de qual vila?',
        answers:['Konoha', 'Suna', 'Kiri'],
        correct:0
    },
    {
        question:'Quem matou CELL em Dragon Ball Z?',
        answers:['Goku', 'Kuririn', 'Gohan'],
        correct:2
    },
    {
        question:'Quem entregou o chapéu de palha para Luffy?',
        answers:['O Rei dos Piratas', 'Shanks', 'Monkey D. Garp'],
        correct:1
    },
    {
        question:'Qual foi o segundo sensei de Ichigo?',
        answers:['Kisuke Urahara', 'Rukia Kuchiki', 'Zangetsu'],
        correct:0
    },
    {
        question:'Qual habilidade principal de Suguru Geto?',
        answers:['Dez Sombras', 'Proporção 7:3', 'Manipulação de Maldições'],
        correct:2
    },
];

let current = 0;
let score = 0;

const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
const btnNext = document.getElementById('btn')
const scoreEl = document.getElementById('score')


function mostrarPergunta() {
    const currentQuestion = question[current]

    questionEl.textContent = currentQuestion.question;
    // answersEl.textContent = currentQuestion.answers;

    answersEl.innerHTML = '';

    question[current].answers.forEach((AnswersEll, index) =>{
        const botao = document.createElement('button');
        botao.classList.add('botao');
        botao.textContent = `${index + 1}) ${AnswersEll}`
        document.getElementById('answers').appendChild(botao);

        botao.addEventListener('click', () =>{
            if (index === question[current].correct){
                botao.classList.add("correto")
                score++;
                scoreEl.textContent = `Pontuação: ${score}`;
            } else{
                botao.classList.add("errou")
            }
        })
    })

    btnNext.addEventListener('click', () =>{
        current++;

        if(current < question.length){
            mostrarPergunta();
        } else{
            questionEl.textContent = 'Quiz finalizado!'
            answersEl.innerHTML = '';
        }

    })
}

mostrarPergunta();