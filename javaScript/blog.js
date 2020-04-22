function drawingFunction() {

  drawFooter();

  const pageWidth = document.querySelector("body").offsetWidth;

/* Text width & center*/
  const leftImages = document.querySelectorAll(".historiesLeftImage");
  const rightImages = document.querySelectorAll(".historiesRightImage");

  const leftParagraphs = document.querySelectorAll(".historiesLeftParagraph");
  const rightParagraphs = document.querySelectorAll(".historiesRightParagraph");

  for (var i = 0; i < rightParagraphs.length; i++) {

    rightParagraphs[i].style.width = pageWidth - leftImages[i].offsetWidth - 96 + "px"; /* 96 for margins */

    const leftMaxHeight = (leftImages[i].offsetHeight > rightParagraphs[i].offsetHeight)? leftImages[i].offsetHeight + 16 + "px": rightParagraphs[i].offsetHeight + 16 + "px";

    if (leftImages[i].offsetHeight > rightParagraphs[i].offsetHeight) {

      leftImages[i].style.marginTop = 1 + "pc";
      leftImages[i].style.marginBottom = 1 + "pc";

      rightParagraphs[i].style.marginTop = (leftImages[i].offsetHeight + 16 - rightParagraphs[i].offsetHeight) / 2 + "px";
      rightParagraphs[i].style.marginBottom = (leftImages[i].offsetHeight + 16 - rightParagraphs[i].offsetHeight) / 2 + "px";
    } else {

      rightParagraphs[i].style.marginTop = 1 + "pc";
      rightParagraphs[i].style.marginBottom = 1 + "pc";

      leftImages[i].style.marginTop = (rightParagraphs[i].offsetHeight + 16 - leftImages[i].offsetHeight) / 2 + "px";
      leftImages[i].style.marginBottom = (rightParagraphs[i].offsetHeight + 16 - leftImages[i].offsetHeight) / 2 + "px";
    }
  }

  for (var i = 0; i < leftParagraphs.length; i++) {

    leftParagraphs[i].style.width = pageWidth - rightImages[i].offsetWidth - 96 + "px"; /* 96 for margins */

    const rightMaxHeight = (rightImages[i].offsetHeight > leftParagraphs[i].offsetHeight)? rightImages[i].offsetHeight + 16 + "px": leftParagraphs[i].offsetHeight + 16 + "px";

    if (rightImages[i].offsetHeight > leftParagraphs[i].offsetHeight) {

      rightImages[i].style.marginTop = 1 + "pc";
      rightImages[i].style.marginBottom = 1 + "pc";

      leftParagraphs[i].style.marginTop = (rightImages[i].offsetHeight + 32 - leftParagraphs[i].offsetHeight) / 2 + "px";
      leftParagraphs[i].style.marginBottom = (rightImages[i].offsetHeight + 32 - leftParagraphs[i].offsetHeight) / 2 + "px";
    } else {

      leftParagraphs[i].style.marginTop = 1 + "pc";
      leftParagraphs[i].style.marginBottom = 1 + "pc";

      rightImages[i].style.marginTop = (leftParagraphs[i].offsetHeight + 32 - rightImages[i].offsetHeight) / 2 + "px";
      rightImages[i].style.marginBottom = (leftParagraphs[i].offsetHeight + 32 - rightImages[i].offsetHeight) / 2 + "px";
    }
  }
}

window.onload = drawingFunction;
window.onresize = drawingFunction;

drawingFunction();