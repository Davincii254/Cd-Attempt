const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to round off to the nearest digit that is divisible by 5
function round(currentSpeed) {
    return Math.ceil(currentSpeed / 5) * 5;
}

// Function to check the speed and deduct points
function speedCheck(currentSpeed) {
    const speedLimit = 70;
    let points = 0;
    if (currentSpeed <= speedLimit) {
        return 'Ok';
    } else {
        points = (round(currentSpeed) - speedLimit) / 5;
        if (points > 12) {
            return "License suspended";
        } else {
            return "Points: " + points;
        }
    }
}

rl.question("Enter your current speed (speedLimit: 70): ", (currentSpeed) => {
    console.log(speedCheck(parseInt(currentSpeed)));
    rl.close();
});
