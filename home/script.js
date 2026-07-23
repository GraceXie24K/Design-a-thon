const button = document.getElementById("menu-button");
const links = document.querySelector("#last");

button.onclick = () => {
    if (links.style.display === "flex") {
        links.style.display = "none";
    } else {
        links.style.display = "flex";
        links.style.flexDirection = "column";
        links.style.position = "absolute";
        links.style.top = "60px";
        links.style.right = "0";
        links.style.background = "#3E3E4B";
        links.style.width = "200px";
    }
};