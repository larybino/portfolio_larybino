const rootHtml = document.documentElement
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

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
