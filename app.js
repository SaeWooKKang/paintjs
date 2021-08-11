const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const paint = document.getElementById("jsPaint");
const range = document.getElementById("jsRange");
const save = document.getElementById("jsSave");
const fill = document.getElementById("jsFill");

const COLOR_WHITE = "white";
const COLOR_BLACK = "#2c2c2c";
const COLOR_BLACK_RGB = "rgb(44, 44, 44)";

let painting = false;
let filling = false;
let nowColor = "";

ctx.lineWidth = 2.5;
ctx.strokeStyle = COLOR_BLACK;
ctx.fillStyle = COLOR_WHITE;
ctx.fillRect(0, 0, 500, 500);
paint.style.backgroundColor = COLOR_BLACK;
paint.style.color = COLOR_WHITE;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (painting === false) {
        ctx.beginPath();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown() {
    painting = true;
}

function onMouseUp() {
    painting = false;
}

function onMouseLeave() {
    painting = false;
}

function handleColorClick(event) {
    nowColor = event.target.style.backgroundColor;

    ctx.strokeStyle = nowColor;
    ctx.fillStyle = nowColor;

    if (filling === true) {
        fill.style.backgroundColor = nowColor;
        paint.style.backgroundColor = COLOR_WHITE; // 반대 배경 흰색
        paint.style.color = COLOR_BLACK;
        if (nowColor === COLOR_BLACK_RGB) {
            fill.style.color = COLOR_WHITE;
        } else {
            fill.style.color = COLOR_BLACK;
        }
    } else {
        paint.style.backgroundColor = nowColor;
        fill.style.backgroundColor = COLOR_WHITE;
        fill.style.color = COLOR_BLACK;
        if (nowColor === COLOR_BLACK_RGB) {
            paint.style.color = COLOR_WHITE;
        } else {
            paint.style.color = COLOR_BLACK;
        }
    }
}

function handleFillClick() {
    filling = true;
    paint.style.backgroundColor = COLOR_WHITE; //반대 초기화
    paint.style.color = COLOR_BLACK; //반대 초기화
    fill.style.backgroundColor = nowColor; //처음 클릭시 bg설정
    if (nowColor === COLOR_BLACK_RGB) {
        fill.style.color = COLOR_WHITE;
    }
}

function canvasClick() {
    if (filling === true) {
        ctx.fillRect(0, 0, 500, 500);
    }
}

function handlePaintClick() {
    filling = false;
    fill.style.backgroundColor = COLOR_WHITE;
    paint.style.color = COLOR_BLACK;
    if (nowColor === COLOR_BLACK_RGB) {
        fill.style.color = COLOR_BLACK;
        paint.style.color = COLOR_WHITE;
    }
    paint.style.backgroundColor = nowColor;
}

function handleInputRange(event) {
    ctx.lineWidth = event.target.value;
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const a = document.createElement("a");
    const imgURL = canvas.toDataURL();
    a.href = imgURL;
    a.download = "paint 🎨";
    a.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseLeave);

Array.from(color).forEach(color => color.addEventListener("click", handleColorClick));
paint.addEventListener("click", handlePaintClick);
fill.addEventListener("click", handleFillClick);

canvas.addEventListener("click", canvasClick);
range.addEventListener("input", handleInputRange);
canvas.addEventListener("contextmenu", handleContextMenu);
save.addEventListener("click", handleSaveClick);