const question = [
    {
        question:'Naruto é de qual vila?',
        answers:['Konoha', 'Suna', 'Kiri'],
        correct:0
    },
];

let current = 0;

const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
const btnNext = document.getElementById('btn')
const scoreEl = document.getElementById('score')


function mostrarPergunta() {
    const currentQuestion = question[current]

    questionEl.textContent = currentQuestion.question;
    // answersEl.textContent = currentQuestion.answers;

    question[current].answers.forEach(AnswersEll =>{
        const botao = document.createElement('button');

        botao.textContent = AnswersEll

        document.getElementById('answers').appendChild(botao);
    })
    
}

mostrarPergunta();