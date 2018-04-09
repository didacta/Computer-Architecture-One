/**
 * LS-8 v2.0 emulator skeleton code
 */

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
  alu(op, regA, regB) {
    switch (op) {
      case 'MUL':
        let result = this.reg[regA] * this.reg[regB];
        this.reg[regA] = result;
        break;
      case 'HLT':
        this.stopClock();
        break;
      case 'LDI':
        this.reg[regA] = regB;
        break;
      case 'PRN':
        console.log(this.reg[regA]);
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)
    let IR = this.reg.PC;
    // !!! IMPLEMENT ME

    // Debugging output
    // console.log(`THIS ${this.reg.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    let operator = this.ram.read(IR);
    let operandA = this.ram.read(IR + 1);
    let operandB = this.ram.read(IR + 2);

    if (operator === 153) {
      operator = 'LDI';
      this.reg.PC += 3;
    }
    if (operator === 67) {
      operator = 'PRN';
      this.reg.PC += 2;
    }
    if (operator === 1) {
      operator = 'HLT';
      this.reg.PC += 1;
    }
    if (operator === 170) {
      operator = 'MUL';
      this.reg.PC += 3;
    }

    // !!! IMPLEMENT ME

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.
    this.alu(operator, operandA, operandB);

    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
  }
}

module.exports = CPU;
