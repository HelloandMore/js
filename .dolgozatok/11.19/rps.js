function stonePaperScissorsWinner(player1, player2) {
    if (player1 === player2) {
        return 'Draw!';
    } else if (
        (player1 === 'scissors' && player2 === 'paper') ||
        (player1 === 'paper' && player2 === 'rock') ||
        (player1 === 'rock' && player2 === 'scissors')
    ) {
        return 'Player 1 won!';
    } else {
        return 'Player 2 won!';
    }
}

function getRandomOption(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

const options = ['rock', 'paper', 'scissors'];

// Run the game 5 times with random options
for (let i = 0; i < 5; i++) {
    const player1 = getRandomOption(options);
    const player2 = getRandomOption(options);
    console.log(stonePaperScissorsWinner(player1, player2));
}
