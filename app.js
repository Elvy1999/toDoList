const html = document.documentElement;
const themeBtn = document.querySelector(".toggle-btn");

themeBtn.addEventListener("click", toggleThemes);

function toggleThemes(e) {
  let theme = html.dataset.theme;
  if (theme == "light") {
    e.target.src = "assets/icon-sun.svg";
    e.target.alt = "Sun image";
    html.dataset.theme = "dark";
  } else if (theme == "dark") {
    e.target.src = "assets/icon-moon.svg";
    e.target.alt = "Moon image";
    html.dataset.theme = "light";
  }
}
