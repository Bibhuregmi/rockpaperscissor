//function to generate random choice for the computer
function getComputerChoice(){
    const choice = ["Rock", "Paper", "Scissor"];
    return choice[Math.floor(Math.random() * choice.length)]; //randomly selectes from the array of choices
}
//function to determine the winner of the round
function determineWinner(playerChoice, computerChoice){
    if (playerChoice === computerChoice){
        return("DRAW"); 
    }
    //winning condition for player
    if(
        (playerChoice === 'Rock' && computerChoice === 'Scissor') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissor' && computerChoice === 'Paper')
    ){
        return('Player');
    }else{
        return('Computer');
    }
}
//variables to track the scores and round count
let playerScore = 0; 
let computerScore = 0; 
let roundCount = 0; 
//adding event listners to all buttons for player action
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id; //getting the player choice form the button id
        const computerChoice = getComputerChoice(); //generating the computer choice 
        const roundResult = determineWinner(playerChoice, computerChoice); //determing the winner of the round 
        //updating the score based on the round result 
        if(roundResult === 'Player') playerScore++; 
        if(roundResult === 'Computer') computerScore++;
        roundCount++; 
        //updating the round information in the ui
        const option = document.getElementById("opt");
            option.textContent = `
                Round ${roundCount} -
                You chose: ${playerChoice} and Computer chose: ${computerChoice}.`;
        //updating the score info in the ui
        const scoreDiv = document.getElementById("score");
            scoreDiv.textContent = `Scores - Player: ${playerScore}, Computer: ${computerScore}.`;
        //condition to stop game after 5 rounds
        if (roundCount === 5){
            const finalResult = playerScore > computerScore ? "Congrats! You won" : playerScore < computerScore ? "Shit! Computer Won!" : "Ohh the game is draw!";
            scoreDiv.textContent += `\nGame Over: ${finalResult}`;
            endRound();
        }
    });
});
//function to reset the game to it's initial state
function resetGame(){
    playerScore = 0; 
    computerScore = 0; 
    roundCount = 0; 

    const roundInfo = document.getElementById('opt');
    const scoreInfo = document.getElementById('score'); 
    roundInfo.textContent = "Choose your option!"
    scoreInfo.textContent = "Score - Player:0, Computer:0 ";
}
//adding event listner to the reset button to reset the game manually 
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);

//function to display a countdown before resetting game 
function showResetCountdown(resetCallBack){
    let countDown = 5; 
    const roundInfo = document.getElementById('opt');
    //updating the ui every second to show the countdown
    const countDownInterval = setInterval(() => {
        roundInfo.textContent = `Game will reset in ${countDown}....`;
        countDown--; 

        if (countDown < 0){
            clearInterval(countDownInterval); 
            resetCallBack();
        }
    }, 1000); //update countdown every 1 second
}

//function to handle the end of the round and initialize the reset countdown
function endRound(){
    const roundInfo = document.getElementById('opt');
    roundInfo.textContent = 'Round Completed!'; 
    showResetCountdown(resetGame);
}