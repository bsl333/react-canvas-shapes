const colorArray = ["#011C40", "#03A688", "#F28705", "#F23005", "#F2A099"];

class Circle {
  constructor(ctx, x, y, dx, dy, radius, maxRadius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = maxRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.mouse = { x: undefined, y: undefined };
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  static createCircle(ctx, maxRadius, innerHeight, innerWidth) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 2;
    return new Circle(ctx, x, y, dx, dy, radius, maxRadius);
  }

  update(innerHeight, innerWidth) {
    if (this.x + this.radius > innerWidth || this.x < this.radius) {
      this.dx *= -1;
    }
    if (this.y + this.radius > innerHeight || this.y < this.radius) {
      this.dy *= -1;
    }
    if (
      this.mouse.x - this.x < 50 &&
      this.mouse.x - this.x > -50 &&
      this.mouse.y - this.y < 50 &&
      this.mouse.y - this.y > -50
    ) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
  setMouse({ x, y }) {
    this.mouse.x = x;
    this.mouse.y = y;
  }
}

export default Circle;
