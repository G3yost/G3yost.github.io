function drawFooter() {

  if(document.querySelector("footer .notes") !== null) {

    const footerWidth = document.querySelector("footer").clientWidth;
    const footerPagesWidth = document.querySelector("footer .allPages").offsetWidth + 50; /* Margins + 2 */

    document.querySelector("footer .notes").style.width = footerWidth - footerPagesWidth + "px";

    footerPagesHeight = document.querySelector("footer .allPages").clientHeight;
    footerNotesHeight = document.querySelector("footer .notes").offsetHeight + 32; /* Margins */

    footerPagesMargin = (footerNotesHeight - footerPagesHeight) / 2 + "px";

    document.querySelector("footer .allPages").style.marginTop = footerPagesMargin;
    document.querySelector("footer .allPages").style.marginBottom = footerPagesMargin;
  }
}