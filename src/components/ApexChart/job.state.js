let mhShift = 16
let totalMt = 24
    // const zeroPointSix = 0.6
    // const zeroPointFour = 0.4
let daysArr22 = [
        20 * mhShift * totalMt, 18 * mhShift * totalMt, 21 * mhShift * totalMt, 21 * mhShift * totalMt, 22 * mhShift * totalMt, 22 * mhShift * totalMt, 21 * mhShift * totalMt, 22 * mhShift * totalMt, 22 * mhShift * totalMt, 20 * mhShift * totalMt, 20 * mhShift * totalMt, 20 * mhShift * totalMt
    ]
    // let daysArr21 = [
    //     20 * mhShift * totalMt, 18 * mhShift * totalMt, 21 * mhShift * totalMt, 21 * mhShift * totalMt, 22 * mhShift * totalMt, 22 * mhShift * totalMt, 21 * mhShift * totalMt, 22 * mhShift * totalMt, 22 * mhShift * totalMt, 21 * mhShift * totalMt, 18 * mhShift * totalMt, 22 * mhShift * totalMt
    // ]
let totalMh1 = 6502;
// let totalMh2 = 6121;
// let totalMh3 = 6400;
let repair20DataFirst = 3100 - 500
let prev20DataFirst = 1500 + 500
let pred20DataFirst = 1150
let safety20DataFirst = 240
let project20DataFirst = 230
let others20DataFirst = 250
let fixedSubstractRepair = 40
let fixedAddPrev = 20
let fixedAddPred = 20

// function getSum(total, num) {
//     return (total + Math.round(num));
// }

// function getAve(totalArr, lengthArr) {
//     return totalArr.reduce(getSum, 0) / lengthArr
// }
// let totalMh22 = getAve(daysArr22, 12);
// let totalMh21 = 6121;
// let totalMh20 = 6400;
// let totalMh19 = 6400;

console.log(daysArr22);

// function convertMhToPercent(mhActivity, totalMh) {
//     return ((mhActivity / totalMh) * 100).toFixed(1)
// }

// function convertPerToMh(perMh, totalMh) {
//     return ((perMh / 100) * totalMh).toFixed(1)
// }
// SUM_FUNCTION
// numbers.reduce(getSum, 0);



export default {
    thn22: {
        months: [
            "2020~2021",
            "2021~2022",
            // "2022~2023",
            ["Apr '22 ", "(20 Days)"],
            ["May '22 ", "(18 Days)"],
            ["Jun '22 ", "(21 Days)"],
            ["Jul '22 ", "(21 Days)"],
            ["Aug '22 ", "(22 Days)"],
            ["Sep '22 ", "(22 Days)"],
            ["Oct '22 ", "(21 Days)"],
            ["Nov '22 ", "(22 Days)"],
            ["Des '22 ", "(22 Days)"],
            ["Jan '23", "(20 Days)"],
            ["Feb '23", "(20 Days)"],
            ["Mar '23", "(20 Days)"],
        ],
        arrMh: [
            [
                6502, 6121,
                // 6200,
                6186, 6186, 6200, 6502, 6121, 6502, 6121,
                6502, 6186, 6121, 6200, 6186,
            ],
            // REPAIR
            [
                repair20DataFirst,
                (repair20DataFirst - (fixedSubstractRepair * 13.5)),
                (repair20DataFirst - (fixedSubstractRepair * 14)),
                (repair20DataFirst - (fixedSubstractRepair * 15)),
                (repair20DataFirst - (fixedSubstractRepair * 16)),
                (repair20DataFirst - (fixedSubstractRepair * 17)),
                (repair20DataFirst - (fixedSubstractRepair * 18)),
                (repair20DataFirst - (fixedSubstractRepair * 19)),
                (repair20DataFirst - (fixedSubstractRepair * 20)),
                (repair20DataFirst - (fixedSubstractRepair * 21)),
                // (repair20DataFirst - (fixedSubstractRepair * 22)),
                // (repair20DataFirst - (fixedSubstractRepair * 23)),
                // (repair20DataFirst - (fixedSubstractRepair * 24)),
                // (repair20DataFirst - (fixedSubstractRepair * 25)),
            ],
            // PRED
            [
                pred20DataFirst,
                (pred20DataFirst + (fixedAddPred * 13.5)),
                (pred20DataFirst + (fixedAddPred * 14)),
                (pred20DataFirst + (fixedAddPred * 15)),
                (pred20DataFirst + (fixedAddPred * 16)),
                (pred20DataFirst + (fixedAddPred * 17)),
                (pred20DataFirst + (fixedAddPred * 18)),
                (pred20DataFirst + (fixedAddPred * 79)),
                (pred20DataFirst + (fixedAddPred * 20)),
                (pred20DataFirst + (fixedAddPred * 21)),
                // (pred20DataFirst + (fixedAddPred * 22)),
                // (pred20DataFirst + (fixedAddPred * 23)),
                // (pred20DataFirst + (fixedAddPred * 24)),
                // (pred20DataFirst + (fixedAddPred * 25)),
            ],
            // PREV
            [
                prev20DataFirst,
                (prev20DataFirst + (fixedAddPrev * 13.5)),
                (prev20DataFirst + (fixedAddPrev * 14)),
                (prev20DataFirst + (fixedAddPrev * 15)),
                (prev20DataFirst + (fixedAddPrev * 16)),
                (prev20DataFirst + (fixedAddPrev * 17)),
                (prev20DataFirst + (fixedAddPrev * 18)) * (20 / 100),
                (prev20DataFirst + (fixedAddPrev * 19)),
                (prev20DataFirst + (fixedAddPrev * 20)),
                (prev20DataFirst + (fixedAddPrev * 21)),
                // (prev20DataFirst + (fixedAddPrev * 22)),
                // (prev20DataFirst + (fixedAddPrev * 23)),
                // (prev20DataFirst + (fixedAddPrev * 24)),
                // (prev20DataFirst + (fixedAddPrev * 25)),
            ],
            // SAFETY
            [
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst * (20 / 100),
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                // safety20DataFirst,
                // safety20DataFirst,
                // safety20DataFirst,
                // safety20DataFirst,
            ],
            // PROJECT
            [
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst * (20 / 100),
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                // project20DataFirst,
                // project20DataFirst,
                // project20DataFirst,
                // project20DataFirst,
            ],
            // OTHERS
            [
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst * (20 / 100),
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                // others20DataFirst,
                // others20DataFirst,
                // others20DataFirst,
                // others20DataFirst,
            ],
        ],
        mhData: [
            100, // 20-21
            100, // 21-22
            // 100, // 22-23
            100, //apr
            100, // may
            100, // jun
            100, // jul (100)
            100, //aug
            100,
            100,
            100,
            null,
            null,
            null,
            null,
        ],
        repairData: [
            (((repair20DataFirst - (fixedSubstractRepair * 1)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 13.5)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 14)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 15)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 16)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 17)) / totalMh1) * 100).toFixed(1),
            ((((repair20DataFirst - (fixedSubstractRepair * 18)) / totalMh1) * 100)).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 19)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 20)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 21)) / totalMh1) * 100).toFixed(1),
            ((((repair20DataFirst - (fixedSubstractRepair * 22)) / totalMh1) * 100) - 24).toFixed(1),
            null,
            null,
            null,
        ],
        // convertMhToPercent(2291.2 * zeroPointSix, totalMh20),
        // convertMhToPercent(2509.6 * zeroPointSix, totalMh21),
        prevData: [
            (((prev20DataFirst + (fixedAddPrev * 2)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 13.5)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 14)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 15)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 16)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 17)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 18)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 19)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 20)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 21)) / totalMh1) * 100).toFixed(1),
            ((((prev20DataFirst + (fixedAddPrev * 21)) / totalMh1) * 100) - 31).toFixed(1),
            null,
            null,
            null,
        ],
        predicData: [
            (((pred20DataFirst + (fixedAddPred * 2)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 13.5)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 14)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 15)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 16)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 17)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 18)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 19)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 20)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 21)) / totalMh1) * 100).toFixed(1),
            ((((pred20DataFirst + (fixedAddPred * 21)) / totalMh1) * 100) - 23).toFixed(1),
            null,
            null,
            null,
        ],
        safetyData: [
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            null,
            null,
            null,
            null,
        ],
        projectData: [

            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(244.8, totalMh21),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            (((project20DataFirst / totalMh1) * 100)).toFixed(1),
            (((project20DataFirst / totalMh1) * 100)).toFixed(1),
            (((project20DataFirst / totalMh1) * 100)).toFixed(1),
            (((project20DataFirst / totalMh1) * 100)).toFixed(1),
            null,
            null,
            null,
            null,
        ],
        othersData: [
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(189.8, totalMh21),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            (((others20DataFirst / totalMh1) * 100)).toFixed(1),
            (((others20DataFirst / totalMh1) * 100)).toFixed(1),
            (((others20DataFirst / totalMh1) * 100)).toFixed(1),
            (((others20DataFirst / totalMh1) * 100)).toFixed(1),
            null,
            null,
            null,
            null,
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // ((others20DataFirst / totalMh1) * 100).toFixed(1),
        ]
    },
    thn21: {
        months: [
            "2019~2020",
            "2020~2021",
            // "2021~2022",
            ["Apr '21", "(20 Days)"],
            ["May '21", "(18 Days)"],
            ["Jun '21", "(21 Days)"],
            ["Jul '21", "(21 Days)"],
            ["Aug '21", "(22 Days)"],
            ["Sep '21", "(22 Days)"],
            ["Oct '21", "(21 Days)"],
            ["Nov '21", "(22 Days)"],
            ["Des '21", "(22 Days)"],
            ["Jan '22", "(20 Days)"],
            ["Feb '22", "(20 Days)"],
            ["Mar '22", "(20 Days)"],
        ],
        arrMh: [
            [
                6502, 6121,
                // 6200,
                6186, 6186, 6200, 6502, 6121, 6502, 6121,
                6502, 6186, 6121, 6200, 6186,
            ],
            // REPAIR
            [
                repair20DataFirst,
                (repair20DataFirst - (fixedSubstractRepair * 1)),
                (repair20DataFirst - (fixedSubstractRepair * 2)),
                (repair20DataFirst - (fixedSubstractRepair * 3)),
                (repair20DataFirst - (fixedSubstractRepair * 4)),
                (repair20DataFirst - (fixedSubstractRepair * 5)),
                (repair20DataFirst - (fixedSubstractRepair * 6)),
                (repair20DataFirst - (fixedSubstractRepair * 7)),
                (repair20DataFirst - (fixedSubstractRepair * 8)),
                (repair20DataFirst - (fixedSubstractRepair * 9)),
                (repair20DataFirst - (fixedSubstractRepair * 10)),
                (repair20DataFirst - (fixedSubstractRepair * 11)),
                (repair20DataFirst - (fixedSubstractRepair * 12)),
                (repair20DataFirst - (fixedSubstractRepair * 13)),
            ],
            // PRED
            [
                pred20DataFirst,
                (pred20DataFirst + (fixedAddPred * 1)),
                (pred20DataFirst + (fixedAddPred * 2)),
                (pred20DataFirst + (fixedAddPred * 3)),
                (pred20DataFirst + (fixedAddPred * 4)),
                (pred20DataFirst + (fixedAddPred * 5)),
                (pred20DataFirst + (fixedAddPred * 6)),
                (pred20DataFirst + (fixedAddPred * 7)),
                (pred20DataFirst + (fixedAddPred * 8)),
                (pred20DataFirst + (fixedAddPred * 9)),
                (pred20DataFirst + (fixedAddPred * 10)),
                (pred20DataFirst + (fixedAddPred * 11)),
                (pred20DataFirst + (fixedAddPred * 12)),
                (pred20DataFirst + (fixedAddPred * 13)),
            ],
            // PREV
            [
                prev20DataFirst,
                (prev20DataFirst + (fixedAddPrev * 1)),
                (prev20DataFirst + (fixedAddPrev * 2)),
                (prev20DataFirst + (fixedAddPrev * 3)),
                (prev20DataFirst + (fixedAddPrev * 4)),
                (prev20DataFirst + (fixedAddPrev * 5)),
                (prev20DataFirst + (fixedAddPrev * 6)),
                (prev20DataFirst + (fixedAddPrev * 7)),
                (prev20DataFirst + (fixedAddPrev * 8)),
                (prev20DataFirst + (fixedAddPrev * 9)),
                (prev20DataFirst + (fixedAddPrev * 10)),
                (prev20DataFirst + (fixedAddPrev * 11)),
                (prev20DataFirst + (fixedAddPrev * 12)),
                (prev20DataFirst + (fixedAddPrev * 13)),
            ],
            // SAFETY
            [
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
                safety20DataFirst,
            ],
            // PROJECT
            [
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
                project20DataFirst,
            ],
            // OTHERS
            [
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
                others20DataFirst,
            ],
        ],
        mhData: [
            100, 100,
            // 100,
            100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
            100, 100,
        ],
        repairData: [
            ((repair20DataFirst / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 1)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 2)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 3)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 4)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 5)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 6)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 7)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 8)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 9)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 10)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 11)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 12)) / totalMh1) * 100).toFixed(1),
            (((repair20DataFirst - (fixedSubstractRepair * 13)) / totalMh1) * 100).toFixed(1),
        ],
        // convertMhToPercent(2291.2 * zeroPointSix, totalMh20),
        // convertMhToPercent(2509.6 * zeroPointSix, totalMh21),
        prevData: [
            (((prev20DataFirst + (fixedAddPrev * 1)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 2)) / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(2509.6 * zeroPointSix, totalMh21),
            (((prev20DataFirst + (fixedAddPrev * 3)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 4)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 5)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 6)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 7)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 8)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 9)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 10)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 11)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 12)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 13)) / totalMh1) * 100).toFixed(1),
            (((prev20DataFirst + (fixedAddPrev * 14)) / totalMh1) * 100).toFixed(1),
        ],
        predicData: [
            (((pred20DataFirst + (fixedAddPred * 1)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 2)) / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(2509.6 * zeroPointSix, totalMh21),
            (((pred20DataFirst + (fixedAddPred * 3)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 4)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 5)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 6)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 7)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 8)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 9)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 10)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 11)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 12)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 13)) / totalMh1) * 100).toFixed(1),
            (((pred20DataFirst + (fixedAddPred * 14)) / totalMh1) * 100).toFixed(1),
        ],
        safetyData: [
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(281.6, totalMh21),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
            ((safety20DataFirst / totalMh1) * 100).toFixed(1),
        ],
        projectData: [

            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(244.8, totalMh21),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
            ((project20DataFirst / totalMh1) * 100).toFixed(1),
        ],
        othersData: [
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            // convertMhToPercent(189.8, totalMh21),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
            ((others20DataFirst / totalMh1) * 100).toFixed(1),
        ]
    },
}