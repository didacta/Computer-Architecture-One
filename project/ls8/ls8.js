const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */

function loadMemory() {
    const filename = process.argv[2] + '';
    const file = fs.readFileSync(filename, 'binary').split('\n');
    const cleanFile = file.map(line => {
        return line.replace(/\#.*/,'').replace(/[^0-9]+/, '');
    });
    // Hardcoded program to print the number 8 on the console

    //print8.ls8
    // const program = [ // print8.ls8
    //     "10011001", // LDI R0,8  Store 8 into R0
    //     "00000000",
    //     "00001000",
    //     "01000011", // PRN R0    Print the value in R0
    //     "00000000",
    //     "00000001"  // HLT       Halt and quit
    // ];

    //mult.ls8
    // const program = [
    //     '10011001',
    //     '00000000',
    //     '00001000',
    //     '10011001',
    //     '00000001',
    //     '00001001',
    //     '10101010',
    //     '00000000',
    //     '00000001',
    //     '01000011',
    //     '00000000',
    //     '00000001',
    // ]
    let program = [];
    cleanFile.forEach(line => {
        if (line === '' || line === '\r') return;
        program.push(line);
    });

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory();

cpu.startClock();