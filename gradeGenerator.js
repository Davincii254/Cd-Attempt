// Imports the Readline library
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to grade the student based on their mark
function grading(mark) {
    const message = "The student's grade is: ";
    if (mark >= 0 && mark <= 100) {
        if (mark > 79) {
            return message + 'A';
        } else if (mark >= 60) {
            return message + 'B';
        } else if (mark >= 50) {
            return message + 'C';
        } else if (mark >= 40) {
            return message + 'D';
        } else {
            return message + 'E';
        }
    } else {
        return 'Please enter marks between 0 and 100.';
    }
}

// Prompt the user to enter the student's mark
rl.question("Enter the student's mark (between 0 and 100): ", (mark) => {
    console.log(grading(parseInt(mark)));
    rl.close();
});
