//what did I learn: mobile first, position: sticky and absolute, filter for icons hover,
//z-index, tags organization

let isOpen = false;
const hamburger = document.querySelector(".hamburger-menu");

hamburger.addEventListener("click", () => {
    console.log(hamburger.children[0]);
    document
        .querySelector(".modal-menu")
        .classList.toggle("hidden");

    if (!isOpen) {
        hamburger.children[0].src =
            "../assets/shared/mobile/icon-close.svg";

        isOpen = true;
    } else {
        hamburger.children[0].src =
            "../assets/shared/mobile/icon-hamburger.svg";

        isOpen = false;
    }
});
