/**
 * LS-8 v2.0 emulator skeleton code
 */
const LDI = 0b10011001;
const PRN = 0b01000011;
const HLT = 0b00000001;
const MUL = 0b10101010;
const ADD = 0b10101000;
const CMP = 0b10100000;

const FLBITS = 0b00000000;
/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter

    // this.setupBranchTable();
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  // alu(op, regA, regB) {
  //   switch (op) {
  //     case LDI:
  //       this.reg[regA] = regB;
  //       break;
  //     case PRN:
  //       console.log("PRINT", this.reg[regA]);
  //       break;
  //     case MUL:
  //       let multiplication = this.reg[regA] * this.reg[regB];
  //       this.reg[regA] = multiplication;
  //       break;
  //     case ADD:
  //       let addition = this.reg[regA] + this.reg[regB];
  //       this.reg[regA] = addition;
  //       break;
  //     case HLT:
  //       this.stopClock();
  //       break;
  //   }
  // }

  handle_LDI(regA, regB) {
    console.log('REG', this.reg);
    this.reg[regA] = regB;
  }
  handle_PRN(regA) {
    console.log('PRINT', this.reg[regA]);
  }
  handle_MUL(regA, regB) {
    let multiplication = this.reg[regA] * this.reg[regB];
    this.reg[regA] = multiplication;
  }
  handle_ADD(regA, regB) {
    let addition = this.reg[regA] + this.reg[regB];
    this.reg[regA] = addition;
  }
  handle_HLT() {
    this.stopClock();
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)
    let IR = this.ram.read(this.reg.PC);
    // !!! IMPLEMENT ME

    // Debugging output
    // console.log(`THIS ${this.reg.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    let operandA = this.ram.read(this.reg.PC + 1);
    let operandB = this.ram.read(this.reg.PC + 2);

    // !!! IMPLEMENT ME

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.
    // this.alu(IR, operandA, operandB);

    let branchTable = {};
    // branchTable[LDI] = handle_LDI;
    // branchTable[PRN] = handle_PRN;
    // branchTable[MUL] = handle_MUL;
    // branchTable[ADD] = handle_ADD;
    // branchTable[HLT] = handle_HLT;
    branchTable[LDI] = this.handle_LDI;
    branchTable[PRN] = this.handle_PRN;
    branchTable[MUL] = this.handle_MUL;
    branchTable[ADD] = this.handle_ADD;
    branchTable[HLT] = this.handle_HLT;

    let handler = branchTable[IR];
    console.log("BRANCH", branchTable[IR])
    console.log("HANDLER", handler)
    this.handle_LDI(operandA, operandB)
    handler(operandA, operandB);


    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    let operandCount = (IR >>> 6) & 0b11;
    this.reg.PC += operandCount + 1;

    // !!! IMPLEMENT ME
  }
}

function handle_LDI(regA, regB) {
  console.log(regA, regB);
  console.log('1', this.reg);

  this.reg[regA] = regB;
}
function handle_PRN(regA) {
  console.log('PRINT', this.reg[regA]);
}
function handle_MUL(regA, regB) {
  let multiplication = this.reg[regA] * this.reg[regB];
  this.reg[regA] = multiplication;
}
function handle_ADD(regA, regB) {
  let addition = this.reg[regA] + this.reg[regB];
  this.reg[regA] = addition;
}
function handle_HLT() {
  this.stopClock();
}

module.exports = CPU;
