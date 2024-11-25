function getComputerChoice(){
    const choice = ["Rock", "Paper", "Scissor"];
    return choice[Math.floor(Math.random() * choice.length)];
}

function determineWinner(playerChoice, computerChoice){
    if (playerChoice === computerChoice){
        return("DRAW"); 
    }
    if(
        (playerChoice === 'rock' && computerChoice === 'scissor') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissor' && computerChoice === 'paper')
    ){
        return('Player');
    }else{
        return('Computer');
    }
}

let playerScore = 0; 
let computerScore = 0; 
let roundCount = 0; 

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        const roundResult = determineWinner(playerChoice, computerChoice);

        if(roundResult === 'Player') playerScore++; 
        if(roundResult === 'Computer') computerScore++;
        roundCount++; 

        const option = document.getElementById("opt");
            option.textContent = `
                Round ${roundCount} -
                You chose: ${playerChoice} and Computer chose: ${computerChoice}.`;
        const scoreDiv = document.getElementById("score");
            scoreDiv.textContent = `Scores - Player: ${playerScore}, Computer: ${computerScore}.`;
        
        if (roundCount === 5){
            const finalResult = playerScore > computerScore ? "Congrats! You won" : playerScore < computerScore ? "Shit! Computer Won!" : "Ohh the game is draw!";
            scoreDiv.textContent += `\nGame Over: ${finalResult}`;
        }
    });
});

function resetGame(){
    playerScore = 0; 
    computerScore = 0; 
    roundCount = 0; 

    const roundInfo = document.getElementById('opt');
    const scoreInfo = document.getElementById('score'); 

    roundInfo.textContent = "Choose your option!"
    scoreInfo.textContent = "Score - Player:0, Computer:0 ";
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);