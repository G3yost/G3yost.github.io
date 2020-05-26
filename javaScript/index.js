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
    const cardCount = 3
    const innerSpace = 8;
    const outerSpace = Math.floor((pageWidth - (cardCount * cardWidth) - ((cardCount - 1) * 16)) / 2) - 5;
console.log(pageWidth);
console.log(cardCount);
    const cards = document.querySelectorAll(".linkCard");
    cards.forEach(function(card) {

      card.style.marginLeft = innerSpace + "px";
      card.style.marginRight = innerSpace + "px";
    });


    document.querySelector(".header").style.marginTop = "1.0pc";

    cards[0].style.marginLeft = outerSpace + "px";
    cards[2].style.marginRight = outerSpace + "px";
    cards[3].style.marginLeft = outerSpace + "px";
    cards[5].style.marginRight = outerSpace + "px";

/* Page Links End */
}

window.onload = drawingFunction;
window.onresize = drawingFunction;

drawingFunction();