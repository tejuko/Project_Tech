const container = document.getElementById("characters");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const backBtn = document.getElementById("back-btn");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let currentSearch = "";
let totalPages = 1;

async function fetchCharacters() {
  try {
    const url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${currentSearch}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("No results");

    const data = await res.json();

    container.innerHTML = "";

    data.results.forEach(char => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <h4>${char.name}</h4>
        <p>${char.status} - ${char.species}</p>
      `;

      container.appendChild(card);
    });

    totalPages = data.info.pages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

  } catch (error) {
    container.innerHTML = "😢 No characters found.";
    pageInfo.textContent = "";
  }

  // 🔄 Toggle back button visibility
  backBtn.style.display = currentSearch ? "inline-block" : "none";
}

// 🔍 Search
searchBtn.addEventListener("click", () => {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  fetchCharacters();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 🚫 stop form submit
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    fetchCharacters();
  }
});

// ⬅️ Reset search
backBtn.addEventListener("click", () => {
  currentSearch = "";
  searchInput.value = "";
  currentPage = 1;
  fetchCharacters();
});

// ➡️ Pagination
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters();
  }
});

// 🚀 Initial load
fetchCharacters();

// Huiswerk
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});