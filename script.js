const toggleTheme = document.getElementById("toggleTheme");
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");


function changeTheme(){
  const tema = document.body.getAttribute("data-theme");
  const novoTema = tema == 'dark' ? 'light' : 'dark';
  localStorage.setItem("tema", novoTema);
  document.body.setAttribute("data-theme", novoTema);
  const toggleTheme=document.getElementById("toggleTheme");
  toggleTheme.classList.toggle("bi-sun")
  toggleTheme.classList.toggle("bi-moon-stars")
}

toggleTheme.addEventListener("click", changeTheme);

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

async function buscarVersiculo() {
  try {
      const response = await fetch("https://bible-api.com/?random=verse");
      const data = await response.json();
      document.getElementById("versiculo").innerText = `"${data.text}" - ${data.reference}`;
  } catch (error) {
      console.error("Erro ao buscar o versículo:", error);
      document.getElementById("versiculo").innerText = "Não foi possível carregar um versículo.";
  }
}
document.addEventListener("DOMContentLoaded", buscarVersiculo);

document.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema") || "dark";
  document.body.setAttribute("data-theme", temaSalvo);
  const toggleTheme = document.getElementById("toggleTheme");
  if (temaSalvo === "light") {
    toggleTheme.classList.add("bi-sun");
    toggleTheme.classList.remove("bi-moon-stars");
  } else {
    toggleTheme.classList.add("bi-moon-stars");
    toggleTheme.classList.remove("bi-sun");
  }
});
