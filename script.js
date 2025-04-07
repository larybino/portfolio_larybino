const toggleTheme = document.getElementById("toggleTheme");
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");


function changeTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("tema", newTheme);
  document.body.setAttribute("data-theme", newTheme);

  document.getElementById("iconSun").style.display = newTheme === "dark" ? "inline" : "none";
  document.getElementById("iconMoon").style.display = newTheme === "dark" ? "none" : "inline";
}


accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  })
})

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})

async function searchVerse() {
  try {
      const response = await fetch("https://bible-api.com/?random=verse");
      const data = await response.json();
      document.getElementById("verse").innerText = `"${data.text}" - ${data.reference}`;
  } catch (error) {
      console.error("Erro ao buscar o versículo:", error);
      document.getElementById("verse").innerText = "Não foi possível carregar um versículo.";
  }
}
document.addEventListener("DOMContentLoaded", searchVerse);

document.addEventListener("DOMContentLoaded", () => {
  const tema = localStorage.getItem("tema") || "dark";
  document.body.setAttribute("data-theme", tema);
  atualizarIcone(tema);

  document.getElementById("toggleTheme").addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("tema", newTheme);
    atualizarIcone(newTheme);
  });
});

function atualizarIcone(tema) {
  const sun = document.getElementById("iconSun");
  const moon = document.getElementById("iconMoon");
  if (tema === "dark") {
    sun.style.display = "inline";
    moon.style.display = "none";
  } else {
    sun.style.display = "none";
    moon.style.display = "inline";
  }
}


