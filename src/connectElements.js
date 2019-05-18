function createSVG() {
  const svg = document.getElementById("svg-canvas");
  return svg;
}

function drawCircle(x, y, radius, color) {
  const svg = createSVG();
  const shape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  shape.setAttributeNS(null, "cx", x);
  shape.setAttributeNS(null, "cy", y);
  shape.setAttributeNS(null, "r", radius);
  shape.setAttributeNS(null, "fill", color);
  svg.appendChild(shape);
}

function findAbsolutePosition(htmlElement) {
  let x = 0;
  let y = 0;
  for (let el = htmlElement; el != null; el = el.offsetParent) {
    x += el.offsetLeft;
    y += el.offsetTop;
  }
  return {
    x: x,
    y: y
  };
}

function findPosition(htmlElement) {
  let x = 0;
  let y = 0;
  for (let el = htmlElement; el != null; el = el.offsetParent) {
    x += el.offsetLeft;
    y += el.offsetTop;
  }
  let padding = findAbsolutePosition(document.getElementById("heap"));
  return {
    x: x - padding.x,
    y: y - padding.y
  };
}

function drawCurvedLine(x1, y1, x2, y2, color, tension) {
  const svg = createSVG();
  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const delta = (x2 - x1) * tension;
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  const path =
    "M " +
    x1 +
    " " +
    y1 +
    " C " +
    hx1 +
    " " +
    hy1 +
    " " +
    hx2 +
    " " +
    hy2 +
    " " +
    x2 +
    " " +
    y2;
  shape.setAttributeNS(null, "d", path);
  shape.setAttributeNS(null, "fill", "none");
  shape.setAttributeNS(null, "stroke", color);
  svg.appendChild(shape);
}

function connectElements(leftId, rightId, color, tension) {
  const left = document.getElementById(leftId);
  const right = document.getElementById(rightId);

  if (left === null || right === null) {
    return;
  }

  const leftPos = findPosition(left);
  let x1 = leftPos.x;
  let y1 = leftPos.y;
  x1 += left.offsetWidth / 2;
  y1 += left.offsetHeight;

  const rightPos = findPosition(right);
  let x2 = rightPos.x;
  let y2 = rightPos.y;
  x2 += right.offsetWidth / 2;

  drawCircle(x1, y1, 3, color);
  drawCircle(x2, y2, 3, color);
  drawCurvedLine(x1, y1, x2, y2, color, tension);
}

export default connectElements;
