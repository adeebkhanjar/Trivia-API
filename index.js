const mainContainer = document.querySelector('.main-container'),
    questionTab = document.querySelector('.inner-container'),
    mainMenu = document.querySelector('.main-menu'),
    mainScore = document.querySelector('.main-score'),
    yourScore = document.querySelector('.h2'),
    btn = document.querySelectorAll('input'),
    score = document.querySelector('.score');
//starting values
let difficulty = 'easy',
    category = '10',
    i = -1,
    shuffle =
    Qarray = [];
mainContainer.style.display = 'none'
mainScore.style.display = 'none'
btn[12].style.marginBottom = '10px'
    //event listeners
btn[4].addEventListener('click', restart) //restart button
btn[12].addEventListener('click', restart) //restart button
btn[5].addEventListener('click', picker) //easy button
btn[6].addEventListener('click', picker) //medium button
btn[7].addEventListener('click', picker) //hard button
btn[8].addEventListener('click', picker) //general knoledge button
btn[9].addEventListener('click', picker) //entertainment button
btn[10].addEventListener('click', picker) //science button
btn[11].addEventListener('click', awaitGetQuestion) //start button
    //resetting all the variables 
function restart() {
    mainMenu.style.display = 'block'
    mainContainer.style.display = 'none'
    mainScore.style.display = 'none'
    i = -1;
    score.innerHTML = 0;
    difficulty = 'easy';
    category = '10';
    i = -1;
    shuffle = Qarray = [];
}
//choosing what difficulty and category to change in the api url
function picker(e) {
    if (e.target.className == 'diff') {
        difficulty = e.target.value;
    } else {
        switch (e.target.value) {
            case 'General Knowledge':
                category = 10
                break;
            case 'Entertainment':
                category = Math.floor(Math.random() * 5) + 12
                break;
            case 'Science':
                category = Math.floor(Math.random() * 3) + 17
                break;
        }
    }
}

//fetch 10 objects containing :one question, one right answer and three wrong answers, with set difficulty and category
async function getQuestion() {
    mainMenu.style.display = 'none'
    mainContainer.style.display = 'block'
    let getQuestionm = await (await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)).json()
    console.log(getQuestionm);
    return getQuestionm.results
}
//delaying the activaition of the main function till the fetching is complete
async function awaitGetQuestion() {
    qarray = await getQuestion()
    console.log(qarray);
    Main()
}
//displaying the questions and answers out of 'qarray' which includes 10 objects fetched
async function Main() {
    i++
    shuffle = [qarray[i].correct_answer]
    btn.forEach(btn => {
        btn.style.backgroundColor = 'deepskyblue'
    })
    for (let j = 0; j < 3; j++) {
        shuffle.push(qarray[i].incorrect_answers[j])
    }
    shuffle.sort().forEach((answer, index) => { btn[index].value = answer })
    questionTab.innerHTML = qarray[i].question
    btn[0].addEventListener('click', checkAnswer)
    btn[1].addEventListener('click', checkAnswer)
    btn[2].addEventListener('click', checkAnswer)
    btn[3].addEventListener('click', checkAnswer)
}
//check if answer is correct add to the score and continue if incorrect continue without updating the score for 10 questions then displaying the final score screen 
function checkAnswer(e) {
    if (e.target.value == qarray[i].correct_answer) {
        e.target.style.backgroundColor = 'limegreen'
        score.innerHTML++
            if (i < 9) { setTimeout(Main, 500) } else {
                mainScore.style.display = 'block';
                mainContainer.style.display = 'none'
                yourScore.innerHTML = `${score.innerHTML}/10`
            }
    } else {
        e.target.style.backgroundColor = 'orangered'
        if (i < 9) { setTimeout(Main, 500) } else {
            mainScore.style.display = 'block';
            mainContainer.style.display = 'none'
            yourScore.innerHTML = `${score.innerHTML}/10`
        }
    }
}