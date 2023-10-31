const popupContainer = document.querySelector("div.popup-container");
const popupContents = document.querySelector("div.popup-contents");

function togglePopup() { popupContainer.classList.toggle("closed") }

popupContents.addEventListener("click", togglePopup);

document.addEventListener("keydown", function(event) {
    if (event.which === 80) {
      console.log("p pressed");
      togglePopup();
    }
});


