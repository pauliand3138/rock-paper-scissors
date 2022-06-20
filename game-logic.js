const CHOICES = ["Rock", "Paper", "Scissors"];

const computerPlay = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    const computerChoice = CHOICES[randomNumber];
    return computerChoice;
}

function gameStart(playerChoice) {
    computerChoice = computerPlay();
    let gameResult = "";
    let winner = "";
    if ((playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock")    ||
        (playerChoice === "Scissors" && computerChoice === "Paper")) {
            gameResult = "You Win!";
            winner = "PLAYER";
    } else if ((playerChoice === "Rock" && computerChoice === "Paper")     ||
               (playerChoice === "Paper" && computerChoice === "Scissors") ||
               (playerChoice === "Scissors" && computerChoice === "Rock")) {
                gameResult = "You Lose!"
                winner = "COMPUTER";
    } else {
        gameResult = "It's a Tie!";
    }
    setPlayerChoiceText(playerChoice);
    setComputerChoiceText(computerChoice);
    setPlayerAndComputerChoiceImage(playerChoice, computerChoice);
    setGameResultText(gameResult);
    increaseWinnerPointAndAnimation(winner);
    increaseGameCount();
}

function setPlayerChoiceText(playerChoice) {
    const playerChoiceText = document.getElementById("player-choice-text");
    playerChoiceText.innerText = playerChoice;
}

function setComputerChoiceText(computerChoice) {
    const computerChoiceText = document.getElementById("computer-choice-text");
    computerChoiceText.innerText = computerChoice;
}

function setPlayerAndComputerChoiceImage(playerChoice, computerChoice) {
    const choiceArray = [playerChoice, computerChoice];
    let imgSrc = "";

    choiceArray.forEach( (item, index) => {
        if (item == "Rock") {
            imgSrc = "img/rock.png";
        } else if (item == "Paper") {
            imgSrc = "img/paper.png";
        } else {
            imgSrc = "img/scissors.png";
        }

        if (index == 0) {
            document.getElementById("player-choice-img").src=imgSrc;
        } else {
            document.getElementById("computer-choice-img").src=imgSrc;
        }
    })
}

function setGameResultText(gameResult) {
    const gameResultText = document.getElementById("result");
    gameResultText.innerText = gameResult;
}

function increaseWinnerPointAndAnimation(winner) {
    const playerPointSection = document.getElementById("player-section");
    const computerPointSection = document.getElementById("computer-section");

    const playerPointText = document.getElementById("player-point");
    let playerPoint = parseInt(playerPointText.innerText);

    const computerPointText = document.getElementById("computer-point");
    let computerPoint = parseInt(computerPointText.innerText);

    if (winner == "PLAYER") {
        playerPointText.innerText = playerPoint + 1;
        const winAudio = new Audio("raw/win-sound-effect.mp3");
        winAudio.volume = 0.3;
        winAudio.play();
        playerPointSection.classList.add('win-animation');
        setTimeout(() => {
            playerPointSection.classList.remove('win-animation');
        }, 500)
        checkGameEnd(winner, playerPoint + 1);
    } else if (winner == "COMPUTER") {
        computerPointText.innerText = computerPoint + 1;
        const loseAudio = new Audio("raw/lose-sound-effect.mp3");
        loseAudio.volume = 0.2;
        loseAudio.play();
        computerPointSection.classList.add('win-animation');
        setTimeout(() => {
            computerPointSection.classList.remove('win-animation');
        }, 500)
        checkGameEnd(winner, computerPoint + 1);
    } else {
        const tieAudio = new Audio("raw/tie-sound-effect.mp3");
        tieAudio.volume = 0.2;
        tieAudio.play();
        playerPointSection.classList.add('tie-animation');
        computerPointSection.classList.add('tie-animation');
        setTimeout(() => {
            playerPointSection.classList.remove('tie-animation');
            computerPointSection.classList.remove('tie-animation');
        }, 500)

    }

    
}

function increaseGameCount() {
    const gameCountText = document.getElementById("game-count");
    let gameCount = parseInt(gameCountText.innerText);
    gameCountText.innerText = gameCount + 1;
}

function checkGameEnd(winner, point) {
    if (point == 5) {
        let modalTitle = document.getElementById("modal-title");
        let modalDescription = document.getElementById("modal-description");
        if (winner == "PLAYER") {   
            modalTitle.innerText = "Congratulations!"
            modalDescription.innerText = "You won the game!"
        } else {
            modalTitle.innerText = "Uh oh!"
            modalDescription.innerText = "You lost the game!"
        }
        let modal = document.getElementById("popup-modal");
        modal.style.display = "block";
    }
}

function resetGame() {
    document.getElementById("player-choice-text").innerText = "Your Choice";
    document.getElementById("computer-choice-text").innerText = "Computer's Choice";
    document.getElementById("player-choice-img").src = "";
    document.getElementById("computer-choice-img").src = "";
    document.getElementById("game-count").innerText = "0";
    document.getElementById("player-point").innerText = "0";
    document.getElementById("computer-point").innerText = "0";
    document.getElementById("result").innerText = "Game Result";
}

const rock = document.getElementById("Rock");
rock.onclick = function(e) {
     gameStart(e.target.id);
     
}

const paper = document.getElementById("Paper");
paper.onclick = function(e) {
    gameStart(e.target.id);
}

const scissors = document.getElementById("Scissors");
scissors.onclick = function(e) {
    gameStart(e.target.id);
}

const modalButton = document.getElementById("modal-button");
modalButton.onclick = function(e) {
    let modal = document.getElementById("popup-modal");
    modal.style.display = "none";
    resetGame();
}