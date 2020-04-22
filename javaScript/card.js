function drawingFunction() {

  drawFooter();

/* Width Calculation */
  if(document.querySelector(".card") != null) {
    const cardWidth = document.querySelector(".card").clientWidth;
    const cardImgWidth = document.querySelector(".image").offsetWidth;
    const cardDescriptionWidth = (cardWidth - (cardImgWidth + 34)); /*34 =  Margins + 2 */

    const cardDescriptions = document.querySelectorAll(".description");
    cardDescriptions.forEach(function(cardDescription) { cardDescription.style.width = cardDescriptionWidth + "px"; });

/* Height Calculation */
    const cardImgHeight = document.querySelector(".image").offsetHeight;
    const cards = document.querySelectorAll(".card");
    for (var i = 0; i < cardDescriptions.length ; i++) {
      
      if (cardDescriptions[i].offsetHeight > cardImgHeight) {

        cards[i].style.height = cardDescriptions[i].offsetHeight + 16 + "px"; /* 16 = margins */

      } else {

        cards[i].style.height = cardImgHeight + 16 + "px"; /* 16 = margins */
      }
    }

/* Center Image Calculation */
    const cardImgs = document.querySelectorAll(".image");

    for (var i = 0; i < cardImgs.length ; i++) {

      const cardImgMargin = ((cards[i].clientHeight - cardImgs[i].clientHeight) / 2);

      cardImgs[i].style.marginTop = cardImgMargin + "px";
      cardImgs[i].style.marginBottom = cardImgMargin + "px";
    }
  }
}

window.onload = drawingFunction;
window.onresize = drawingFunction;

drawingFunction();