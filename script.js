const toggleTheme = document.getElementById("toggleTheme");
const toggleLanguage = document.getElementById("toggleLanguage");
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

let idiomaAtual = localStorage.getItem("idioma") || "pt";
carregarIdioma(idiomaAtual);

function alterarIdioma() {
    idiomaAtual= idiomaAtual == "pt" ? "en" : "pt";
    localStorage.setItem("idioma", idiomaAtual);
    carregarIdioma(idiomaAtual);
}

toggleLanguage.addEventListener("click", alterarIdioma);

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`)
    .then(data=> data.json())
    .then(data=> traduzirPagina(data))

}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave);
        if(linguagem[chave]){
            elemento.textContent = linguagem[chave];

        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((elemento) => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n-alt");
        if(linguagem[chave]){
            elemento.setAttribute("alt", linguagem[chave]);
        }
    });
}

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
      document.getElementById("verse").innerText = `"${data.text}" - ${data.reference}`;
  } catch (error) {
      console.error("Erro ao buscar o versículo:", error);
      document.getElementById("verse").innerText = "Não foi possível carregar um versículo.";
  }
}
document.addEventListener("DOMContentLoaded", buscarVersiculo);