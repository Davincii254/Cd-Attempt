const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to calculate net Salary from the gross salary
function calculateNetSalary(grossSalary) {
    // Functions to calculate the tax deductions based on the gross salary
    function payeDeduction(grossSalary) {
        // Pay As You Earn (PAYE) deduction calculation
        // Implementation of PAYE tax bands
        if (grossSalary <= 24000) {
            return 2400 * 0.1;
        } else if (grossSalary <= 32333) {
            return ((grossSalary - 24000) * 0.25) + 2400;
        } else if (grossSalary <= 500000) {
            return ((grossSalary - 32333) * 0.3) + (8333 * 0.25) + 2400;
        } else {
            return (grossSalary * 0.35);
        }
    }

    function nhifDeduction(grossSalary) {
        // National Hospital Insurance Fund (NHIF) deduction calculation
        // Implementation of NHIF bands
        if (grossSalary <= 5999) {
            return 150;
        } else if (grossSalary <= 99999) {
            // NHIF deduction varies based on gross salary ranges
            const ranges = [6000, 8000, 12000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000];
            const deductions = [300, 400, 500, 600, 750, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
            for (let i = 0; i < ranges.length; i++) {
                if (grossSalary <= ranges[i]) {
                    return deductions[i];
                }
            }
            // If gross salary is above the last range, return the last deduction
            return 1700;
        } else {
            return 1700;
        }
    }

    function nssfDeductionTier1() {
        // National Social Security Fund (NSSF) Tier 1 deduction calculation
        const pensionablePay = 6000;
        return pensionablePay * 0.06;
    }

    function housingLevyDeduction(grossSalary) {
        // Housing Levy deduction calculation
        return grossSalary * 0.015;
    }

    // Deducts the taxes using the functions stated above
    const personalRelief = 2400; // Personal relief eases tax payment
    const payeDeducted = Math.floor(payeDeduction(grossSalary)) - personalRelief;
    const nhifDeducted = nhifDeduction(grossSalary);
    const nssfDeducted = nssfDeductionTier1();
    const housingLevy = Math.floor(housingLevyDeduction(grossSalary));

    const netSalary = grossSalary - payeDeducted - nhifDeducted - nssfDeducted - housingLevy;

    return (`
    Gross Salary: ${grossSalary}\n
    PAYE: ${payeDeducted}\n
    NHIF: ${nhifDeducted}\n
    NSSF(Tier 1): ${nssfDeducted}\n
    Housing Levy: ${housingLevy}\n
    ------------------------------------\n
    Net Salary: ${netSalary}\n
    `);
}

rl.question("Enter your gross salary: ", (grossSalary) => {
    console.log(calculateNetSalary(parseInt(grossSalary)));
    rl.close();
});
