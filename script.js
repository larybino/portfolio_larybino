const toggleTheme = document.getElementById("toggleTheme");
const toggleLanguage = document.getElementById("toggleLanguage");
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

let languageCurrent = localStorage.getItem("language") || "pt";
loadLanguage(languageCurrent);

function changeLanguage() {
    languageCurrent= languageCurrent == "pt" ? "en" : "pt";
    localStorage.setItem("language", languageCurrent);
    loadLanguage(languageCurrent);
}

toggleLanguage.addEventListener("click", changeLanguage);

function loadLanguage(language) {
    fetch(`json/${language}.json`)
    .then(data=> data.json())
    .then(data=> translatePage(data))

}

function translatePage(language) {
    document.querySelectorAll("[data-i18n]").forEach((e) => {
        console.log(e);
        const key = e.getAttribute("data-i18n");
        console.log(key);
        if(language[key]){
            e.textContent = language[key];

        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((e) => {
        console.log(e);
        const key = e.getAttribute("data-i18n-alt");
        if(language[key]){
            e.setAttribute("alt", language[key]);
        }
    });
}

function changeTheme(){
  const theme = document.body.getAttribute("data-theme");
  const newTheme = theme == 'dark' ? 'light' : 'dark';
  localStorage.setItem("theme", newTheme);
  document.body.setAttribute("data-theme", newTheme);
  const toggleTheme=document.getElementById("toggleTheme");
  toggleTheme.classList.toggle("bi-sun")
  toggleTheme.classList.toggle("bi-moon-stars")
}

toggleTheme.addEventListener("click", changeTheme);

document.addEventListener("DOMContentLoaded", () => {
  const saveTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", saveTheme);
  const toggleTheme = document.getElementById("toggleTheme");
  if (saveTheme === "light") {
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