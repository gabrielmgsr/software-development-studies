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
