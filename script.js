const instagram = "https://www.instagram.com/CANCERIAN_STORE/";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".product-card");
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const wanted = filter.dataset.filter;
    cards.forEach(card => {
      const show = wanted === "all" || card.dataset.category.split(" ").includes(wanted);
      card.style.display = show ? "" : "none";
    });
  });
});

const modal = document.getElementById("productModal");
const modalVisual = document.getElementById("modalVisual");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalSizes = document.getElementById("modalSizes");
const modalCategory = document.getElementById("modalCategory");
const modalInstagram = document.getElementById("modalInstagram");

function openProduct(card) {
  modalTitle.textContent = card.dataset.name;
  modalPrice.textContent = `₹${Number(card.dataset.price).toLocaleString("en-IN")}`;
  modalSizes.textContent = card.dataset.sizes;
  modalCategory.textContent = card.querySelector(".category").textContent;
  const visual = card.querySelector(".product-image").cloneNode(true);
  visual.querySelectorAll("span").forEach(s => s.remove());
  visual.className = "product-image " + [...card.querySelector(".product-image").classList].filter(c => c !== "product-image").join(" ");
  visual.style.width = "100%";
  visual.style.height = "100%";
  modalVisual.innerHTML = "";
  modalVisual.appendChild(visual);
  modalInstagram.href = instagram;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

cards.forEach(card => card.querySelector(".details-btn").addEventListener("click", () => openProduct(card)));

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
