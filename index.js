

let questionNumber = 0;
let score = 0;
let numberOfQuestions = DATA.length

//On click start, hide the start quiz
//unhide the question form
function startTheQuiz (){
 $('.startQuiz').on('click','.startbutton', function(event){
    $('.startQuiz').hide();
    $('.question-form').css('display','block');
 });
}
//this function creates the question and possible answer by 
//retriving them from the other Js file DATA and returns them as
//a product of createQuestion

function createQuestion (){
return `<div id = questionForm ><h2 class="question">${DATA[questionNumber].question}</h2>
<form class="answers">
    <div class="ans">
        <input type="radio" value="${DATA[questionNumber].answers[0]}" name="answer" required>
        <a>${DATA[questionNumber].answers[0]}</a>
    </div>
    <div class="ans">
        <input type="radio" value="${DATA[questionNumber].answers[1]}" name="answer">
        <a>${DATA[questionNumber].answers[1]}</a>
    </div>
        <div class="ans">
        <input type="radio" value="${DATA[questionNumber].answers[2]}" name="answer">
        <a>${DATA[questionNumber].answers[2]}</a>
    </div>
    <div class="ans">
        <input type="radio" value="${DATA[questionNumber].answers[3]}" name="answer">
        <a>${DATA[questionNumber].answers[3]}</a>
    </div>
    <button type="submit" class="submit">Submit</button>
    </form>
    </div>`
};
//the result of createQuestion is to delete everything in the
//question form using the html method
// and then adds the updated questions set
function renderQuestion (){
    $('.question-form').html(createQuestion());
}

//listening to a submit on the document form, 
//show if the user got the correct answer
//or wrong answer
//activates the got the wrong answer or the correct answer function
//update score
function submitAns(){
    $(document).on('submit', 'form', function (event){
        console.log('submitpressed')
        event.preventDefault();

       // console.log('submited!');
       let selectedAnswer = $('input:checked');
       let selectedValue = selectedAnswer.val();
       let correctAnswer = `${DATA[questionNumber].correctAnswer}`;

       // $('#questionForm').hide();
       // console.log(selectedValue);
        //console.log(correctAnswer);

        if (selectedValue === correctAnswer){
            console.log('Correct answer')
            gotItRight();
        }else{
            console.log('Incorrect answer')
            gotItWrong();
        }

        questionNumber += 1;
        $('.questionNumber').html(`${questionNumber}/${numberOfQuestions}`)
        })
    }

//if user got answer correct then it the question form class gets updated
//.html function erases everything in the question form dic and replaces it 
//with the results 
//if answer is correct then the score get updated
function gotItRight (){
    $('.question-form').html(` 
        <h2 class="results">Great Job!</h2>
        <h3 class="description">The correct answer is ${DATA[questionNumber].correctAnswer}</h3>    
        <button type="button" class="nextbttn">Next</button>`)
    score += 1;
    $('.pointScore').html(`${score}/${numberOfQuestions}`)

}
//if user got answer correct then it the question form class gets updated
//.html function erases everything in the question form dic and replaces it 
//with the results 
function gotItWrong (){
    $('.question-form').html(` 
        <h2 class="results">You got the wrong answer!</h2>
        <h3 class="description">The correct answer is ${DATA[questionNumber].correctAnswer}</h3>    
        <button type="button" class="nextbttn">Next</button>`)
}
//listens to the next button being clicked, 
//if question number is less then the length of the data
//then render the next question
//if not then you can call the final result screen
function onNext (){
    $('.question-form').on('click','.nextbttn', function(event) {
        //alert('NextButtonClicked!')
        event.preventDefault();
        if (questionNumber < DATA.length){
            renderQuestion()
        } else {
            finalResultsScreen()
        }
    })
}
//depending on the score the final results screen will display
//a different results screen
function finalResultsScreen(){
    if (score < 5){
        console.log('You did horrible');
        $('.question-form').html(`
        <form>   
            <h2 class="results">You are not worthy to sit on the throne</h2>
            <p> You got ${score} points, you need to rewatch the whole series!</p>
            <button type="button" class="restart" name="restartquiz ">Restart</button>
        </form>  `)
    }
    else if ( score <= 7){
        console.log('You did "okay"')
        $('.question-form').html(`
        <form>   
            <h2 class="results">You are not worthy to sit on the throne</h2>
            <p> You got ${score} points, you're almost there!</p>
            <button type="button" class="restart" name="restartquiz ">Restart</button>
       </form>  `)
    }
    else {
        console.log('you did pretty good!')
        $('.question-form').html(`
        <form>   
            <h2 class="results">You are worthy to sit on the throne</h2>
            <p> You got ${score} points, you must of watched these episodes last night.</p>
            <button type="button" class="restart" name="restartquiz ">Restart</button>
       </form>  `)
    }


}
//function listens for the the restart button being pressed
function restartQuiz() {
    $('.question-form').on('click', '.restart', function(event){
        event.preventDefault()
        console.log('clicked on restart button')
        window.location.reload();
    }
)}


function quiz () {
    startTheQuiz()
    createQuestion()
    renderQuestion()
    submitAns()
    onNext()
    restartQuiz()
};
$(quiz);