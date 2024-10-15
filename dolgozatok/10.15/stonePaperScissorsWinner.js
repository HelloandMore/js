function stonePaperScissorsWinner(player1, player2) {
    if (player1 === player2) {
        return 'The game is a tie.';
    } else if (
        (player1 === 0 && player2 === 1) ||
        (player1 === 1 && player2 === 2) ||
        (player1 === 2 && player2 === 0)
    ) {
        return 'The first player wins.';
    } else {
        return 'The second player wins.';
    }
}

// példák
console.log(stonePaperScissorsWinner(0, 1)); // "The first player wins."
console.log(stonePaperScissorsWinner(1, 2)); // "The first player wins."
console.log(stonePaperScissorsWinner(2, 0)); // "The first player wins."
console.log(stonePaperScissorsWinner(1, 0)); // "The second player wins."
console.log(stonePaperScissorsWinner(2, 1)); // "The second player wins."
console.log(stonePaperScissorsWinner(0, 2)); // "The second player wins."
console.log(stonePaperScissorsWinner(0, 0)); // "The game is a tie."