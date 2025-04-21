const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const resultText = document.getElementById("result");

const segments = [
  "💰 50₽", "🎁 75 фриспинов", "🔥 500% бонус", "💎 Пусто", "🍀 Ещё раз", "🎲 100₽"
];

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
let angle = 0;
let spinning = false;

function drawWheel() {
  const radius = canvas.width / 2;
  const anglePerSegment = (2 * Math.PI) / segments.length;

  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.fillStyle = colors[i];
    ctx.arc(
      radius,
      radius,
      radius,
      anglePerSegment * i,
      anglePerSegment * (i + 1)
    );
    ctx.lineTo(radius, radius);
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(anglePerSegment * i + anglePerSegment / 2);
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px Arial";
    ctx.fillText(segments[i], radius / 2.5, 0);
    ctx.restore();
  }
}

drawWheel();

spinButton.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  let spins = 20 + Math.floor(Math.random() * 10);
  const interval = setInterval(() => {
    angle += 0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawWheel();
    ctx.restore();
    spins--;
    if (spins <= 0) {
      clearInterval(interval);
      const index = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) / (2 * Math.PI)) * segments.length) % segments.length;
      resultText.textContent = "Вы выиграли: " + segments[index];
      spinning = false;
    }
  }, 50);
});
