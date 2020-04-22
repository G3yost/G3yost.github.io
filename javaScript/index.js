function drawingFunction() {

  drawFooter();

/* Contact Table Start */

  const tableWidth = document.querySelector(".listHeader").offsetWidth;
  const emailWidth = document.querySelector(".emailSection").offsetWidth;
  const socialMedia = document.querySelector(".socialMediaSection");

  socialMedia.style.width = (tableWidth - emailWidth) + "px";

/* Contact Table End */
/* Page Links Start */

    const pageWidth = document.querySelector("body").offsetWidth;
    const cardWidth = document.querySelector(".linkCard").offsetWidth;
    const cardCount = (pageWidth < 750) ? 3 : 4;
    const innerSpace = 8;
    const outerSpace = Math.floor((pageWidth - (cardCount * cardWidth) - ((cardCount - 1) * 16)) / 2) - 5;

    const cards = document.querySelectorAll(".linkCard");
    cards.forEach(function(card) {

      card.style.marginLeft = innerSpace + "px";
      card.style.marginRight = innerSpace + "px";
    });

    if (cardCount === 3) {

      document.querySelector(".header").style.marginTop = "1.0pc";

      cards[0].style.marginLeft = outerSpace + "px";
      cards[2].style.marginRight = outerSpace + "px";
      cards[3].style.marginLeft = outerSpace + "px";
      cards[5].style.marginRight = outerSpace + "px";
      cards[6].style.marginLeft = (pageWidth - ((cardWidth + innerSpace) * 2)) / 2 + "px";
      cards[6].style.marginRight = innerSpace + "px";
      cards[7].style.marginLeft = innerSpace + "px";
      cards[7].style.marginRight = (pageWidth - ((cardWidth + innerSpace) * 2)) / 2 + "px";

    } else if (cardCount === 4) {

      document.querySelector(".header").style.marginTop = "3.5pc";

      cards[0].style.marginLeft = outerSpace + "px";;
      cards[3].style.marginRight = outerSpace + "px";;
      cards[4].style.marginLeft = outerSpace + "px";;
      cards[7].style.marginRight = outerSpace + "px";;
    }

/* Page Links End */
}

window.onload = drawingFunction;
window.onresize = drawingFunction;

drawingFunction();