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
      case LDI:
        this.reg[regA] = regB;
        break;
      case PRN:
        console.log(this.reg[regA]);
        break;
      case MUL:
        let multiplication = this.reg[regA] * this.reg[regB];
        this.reg[regA] = multiplication;
        break;
      case ADD:
        let addition = this.reg[regA] + this.reg[regB];
        this.reg[regA] = addition;
        break;
      case HLT:
        this.stopClock();
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
    console.log("IR", IR, "  OPA", operandA, "  OPB", operandB)
    this.alu(IR, operandA, operandB);

    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    let operandCount = (IR >>> 6) & 0b11;
    console.log("OP", operandCount.toString(2))
    this.reg.PC += operandCount + 1;

    // !!! IMPLEMENT ME
  }
}

module.exports = CPU;
