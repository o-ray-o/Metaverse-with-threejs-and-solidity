class KeyMovements {
  constructor() {
    this.movements = {};
    window.addEventListener("keydown", this.down.bind(this));
    window.addEventListener("keyup", this.up.bind(this));
  }

  isPressed(keyCode) {
    return this.movements[keyCode] ? this.movements[keyCode] : false;
  }

  down(e) {
    if (this.movements[e.keyCode]) return;
    this.movements[e.keyCode] = true;
    console.log("KeyDown: ", e.key, "KeyCode: ", e.keyCode);
  }

  up(e) {
    this.movements[e.keyCode] = false;
    console.log("KeyUp: ", e.key, "KeyCode: ", e.keyCode);
  }
}

const Movements = new KeyMovements();
export default Movements;
