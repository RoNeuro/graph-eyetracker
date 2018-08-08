window.onload = onLoad;
function onLoad() {
var year = document.getElementById("year");
var currentYear = document.createTextNode(new Date().getFullYear());
year.appendChild(currentYear);
}