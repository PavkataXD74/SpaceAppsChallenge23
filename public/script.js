const root = document.getElementById("root");
root.addEventListener("click", err => {
    root.style.backgroundColor = root.style.backgroundColor === "red" ? "blue" : "red";
});

