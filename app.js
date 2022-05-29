let tableBody = document.querySelector(".info");
const lastBtn = document.querySelector(".last");
const firstBtn = document.querySelector(".first");
const pageLinks = document.querySelectorAll("a");
let copyData = [];
let rows = 5;
let start = 0;

function getUrl() {
  return "https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/mobile-app/2021/02/12";
}

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadToTable(data.items[0].articles))
    .catch((err) => console.log(err));
}
function init() {
  let url = getUrl();
  getData(url);
}
init();
function loadToTable(data) {
  copyData = [...data];

  tableBody.innerHTML = "";
  let paginatedItems = data.slice(start, rows);
  for (let i = 0; i < paginatedItems.length; i++) {
    tableBody.innerHTML += `
      <tr key=${i}>
            <td>${paginatedItems[i].rank}</td>
            <td>${paginatedItems[i].article}</td>
            <td>${paginatedItems[i].project}</td>
            <td>${paginatedItems[i].views_ceil}</td>
        </tr>`;
  }
}
function objIteration(start, rows) {
  tableBody.innerHTML = "";
  let paginatedItems = copyData.slice(start, rows);
  for (let i = 0; i < paginatedItems.length; i++) {
    tableBody.innerHTML += `
      <tr key=${i}>
            <td>${paginatedItems[i].rank}</td>
            <td>${paginatedItems[i].article}</td>
            <td>${paginatedItems[i].project}</td>
            <td>${paginatedItems[i].views_ceil}</td>
        </tr>`;
  }
}

function handleNumClick(clickedLink) {
  clickedLink.parentElement.classList = "active";
  let clickedPageNum = parseInt(clickedLink.innerText);
  if (clickedPageNum === 1) {
    objIteration(0, 5);
  } else if (clickedPageNum === 2) {
    objIteration(5, 10);
  } else if (clickedPageNum === 3) {
    objIteration(10, 15);
  } else if (clickedPageNum === 4) {
    objIteration(15, 20);
  } else if (clickedPageNum === 5) {
    objIteration(20, 25);
  } else if (clickedPageNum === 6) {
    objIteration(25, copyData.length);
  }
}

pageLinks.forEach((el) => {
  el.addEventListener("click", function () {
    activeLink = document.querySelector(".active");

    activeLink.classList = "page-item";
    activeLink.classList.remove("active");
    handleNumClick(this);
  });
});
firstBtn.addEventListener("click", function () {
  objIteration(0, 5);
});

lastBtn.addEventListener("click", function () {
  objIteration(25, copyData.length);
});
