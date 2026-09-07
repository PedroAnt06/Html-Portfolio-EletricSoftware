// EletricSoftware — Portfólio do Projeto de Estágio
// JS mínimo, sem jQuery/plugins: menu mobile, header com fundo ao rolar,
// headline rotativa (mesmo mecanismo do cd-headline original: alterna a
// classe "is-visible" entre os <b>), botão voltar ao topo e lightbox
// simples para a galeria de telas.

(function () {
  var header = document.getElementById("headerArea");
  var toggle = document.getElementById("mobileMenuBtn");
  var mainMenu = document.getElementById("mainMenu");
  var backTop = document.getElementById("back-top");

  function onScroll() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    if (window.scrollY > 400) {
      backTop.classList.add("visible");
    } else {
      backTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    mainMenu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var isOpen = mainMenu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
})();

// ---------- cd-headline: alterna a classe "is-visible" entre os <b> ----------
(function () {
  var wrapper = document.getElementById("cdWords");
  if (!wrapper) return;
  var words = wrapper.querySelectorAll("b");
  var i = 0;

  setInterval(function () {
    words[i].classList.remove("is-visible");
    i = (i + 1) % words.length;
    words[i].classList.add("is-visible");
  }, 2400);
})();

// ---------- Lightbox da galeria de telas ----------
(function () {
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
  }

  function close() {
    lightbox.classList.remove("open");
  }

  document.querySelectorAll(".gallery-img.has-image").forEach(function (img) {
    img.closest(".box").addEventListener("click", function (e) {
      e.preventDefault();
      open(img.style.backgroundImage.slice(5, -2), "");
    });
  });

  lightbox.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
