const boxContainer = document.querySelector(".box-container");
const allBoxes = boxContainer.querySelectorAll(".box");
const box = document.querySelector(".box");
const allColors = document.querySelectorAll("li[data-color]");
const dropContainer = document.querySelector(".drop-container");

const boxContainerHeight = boxContainer.clientHeight;
const boxContainerWidth = boxContainer.clientWidth;
const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;

const colors = ["green", "purple", "gray", "black", "blue", "red"];

//input all dom color to the colors array
// allColor.forEach((color) => {
//   colors.push(color.dataset.color);
// });

function getRandomArrIndex() {
  return Math.floor(Math.random() * colors.length);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

//shuffleColor()
shuffle(colors);

(function domShuffleColor() {
  allColors.forEach((color, index) => {
    color.dataset.color = colors[index];
    color.textContent = colors[index];
  });
})();

function getRandomLeft() {
  return Math.random() * boxContainerWidth;
}
function getRandomTop() {
  return Math.random() * boxContainerHeight - 100;
}

function dragStartHandler(e) {
  const dataColor = e.target.dataset.color;
  e.dataTransfer.setData("text/plain", dataColor);
  e.dataTransfer.dropEffect = "copy";
}

allBoxes.forEach((box, index) => {
  //   box.style["background-color"] = colors[index];
  //   box.dataset.color = colors[index];

  box.addEventListener("dragstart", dragStartHandler);
});

dropContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropContainer.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropContainer.classList.add("drop-active");
});
dropContainer.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropContainer.classList.remove("drop-active");
});

//drop function

function endResult(msg) {
  alert(msg);
}

function updateLi(rightArr) {
  const containerLi = dropContainer.querySelectorAll("li");
  containerLi.forEach((el) => el.classList.add("wrong"));

  rightArr.forEach((el) => el.classList.remove("wrong"));
}

function showWrong(arr) {
  const rightArr = arr.filter((el, index) => {
    return el.dataset.color === colors[index];
  });
  updateLi(rightArr);
}

function endGame(childs) {
  const newArr = Array.from(childs).filter((el, index) => {
    return el.dataset.color === colors[index];
  });

  if (newArr.length === colors.length) {
    endResult("You Win");
  } else {
    endResult("You lost try again");
    showWrong(newArr);
  }
}

function checkChildren(childs) {
  if (childs.length === colors.length) {
    endGame(childs);
  }
}

dropContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const color = e.dataTransfer.getData("text/plain");

  const hasEl = Array.from(dropContainer.children).find(
    (el) => el.dataset.color === color
  );
  if (!hasEl) {
    dropContainer.classList.remove("drop-active");
    dropContainer.classList.add("clear");
    const li = document.createElement("li");
    li.dataset.color = color;
    li.style.backgroundColor = color;

    dropContainer.appendChild(li);
    setTimeout(() => {
      checkChildren(dropContainer.children);
    }, 100);
  }
});
