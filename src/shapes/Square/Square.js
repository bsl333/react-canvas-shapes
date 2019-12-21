const colorArray = ["#011C40", "#03A688", "#F28705", "#F23005", "#F2A099"];

class Square {
  constructor(ctx, x, y, dx, dy, len, maxLen) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.len = len;
    this.minLen = len;
    this.maxLen = maxLen;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.mouse = { x: undefined, y: undefined };
  }

  static createSquare(ctx, maxLen, innerHeight, innerWidth) {
    let len = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - len * 2) + len;
    let dx = (Math.random() - 0.5) * 2;
    let y = Math.random() * (innerHeight - len * 2) + len;
    let dy = (Math.random() - 0.5) * 2;
    return new Square(ctx, x, y, dx, dy, len, maxLen);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.len, this.len);
  }

  update(innerHeight, innerWidth) {
    if (this.x + this.len > innerWidth || this.x < 0) {
      this.dx *= -1;
    }
    if (this.y + this.len > innerHeight || this.y < 0) {
      this.dy *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (
      this.mouse.x - this.x < 50 &&
      this.mouse.x - this.x > -50 &&
      this.mouse.y - this.y < 50 &&
      this.mouse.y - this.y > -50
    ) {
      if (this.len < this.maxLen) {
        this.len += 1;
      }
    } else if (this.len > this.minLen) {
      this.len -= 1;
    }

    this.draw();
  }

  setMouse({ x, y }) {
    this.mouse.x = x;
    this.mouse.y = y;
  }
}

export default Square;
