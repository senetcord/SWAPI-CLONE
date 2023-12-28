const input = document.querySelector(".js--input");
const fetchBtn = document.querySelector(".js--fetchBtn");
const loadingCircle = document.querySelector(".js--loadingCircle");
const resultContainer = document.querySelector(".js--resultContainer");
const resInfo = document.querySelector(".js--info");

const tryBtns = document.querySelectorAll(".js--hint span");

const URL = `https://swapi.dev/api/`;

fetchBtn.addEventListener("click", makeRequest);
tryBtns.forEach((item) => {
  item.addEventListener("click", tryHint);
});

async function makeRequest(event) {
  event.preventDefault();

  const inputData = input.value.trim();
  if (inputData === "") {
    alert("Please enter a value!");
    return;
  }

  loadingCircle.classList.remove("js--hide");
  if (!resultContainer.classList.contains("js--hide")) {
    resultContainer.classList.add("js--hide");
  }

  try {
    const result = await fetchData(inputData);

    loadingCircle.classList.add("js--hide");
    resultContainer.classList.remove("js--hide");
    resInfo.textContent = JSON.stringify(result, null, 4);
  } catch (error) {
    loadingCircle.classList.add("js--hide");
    resultContainer.classList.remove("js--hide");
    resInfo.textContent = "Error 404";
    throw new Error("404");
  }
}

async function fetchData(inputData) {
  try {
    const res = await fetch(`${URL}${inputData}`);
    const response = await res.json();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
}

function tryHint(e) {
  input.value = e.target.textContent;
  makeRequest(e);
}
