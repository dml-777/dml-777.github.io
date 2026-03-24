const photos = [
  {
    file: "images/photo1.jpg",
    title: "LES",
    medium: "35mm film",
    description: "Flash-lit group portrait capturing a candid social moment.",
    alt: "Three friends posing together."
  },
  {
    file: "images/photo2.jpg",
    title: "Draft",
    medium: "35mm film",
    description: "A close frame of hands, movement, and a shared moment.",
    alt: "People leaning over a table and writing together."
  },
  {
    file: "images/photo3.jpg",
    title: "Mirrors",
    medium: "35mm film",
    description: "Reflection, flash, and repetition in a mirrored interior.",
    alt: "Portrait in a mirrored room with reflective balloons."
  },
  {
    file: "images/photo4.jpg",
    title: "Street Light",
    medium: "35mm film",
    description: "A bright city street scene with movement and architectural depth.",
    alt: "A city street with buildings and pedestrians."
  },
  {
    file: "images/photo5.jpg",
    title: "Degree",
    medium: "35mm film",
    description: "An intimate image centered on gesture and celebration.",
    alt: "A person holding a rolled diploma and a phone indoors."
  },
  {
    file: "images/photo6.jpg",
    title: "Birthday Frame",
    medium: "35mm film",
    description: "A candid birthday photograph full of color and personality.",
    alt: "A person in costume holding a birthday cake with candles."
  },
  {
    file: "images/photo7.jpg",
    title: "Waterfront",
    medium: "35mm film",
    description: "City skyline and water framed in warm evening light.",
    alt: "A waterfront skyline scene at sunset."
  },
  {
    file: "images/photo8.jpg",
    title: "Cake",
    medium: "35mm film",
    description: "A close image centered on gesture, celebration, and detail.",
  },
  {
    file: "images/photo9.jpg",
    title: "Frame Nine",
    medium: "35mm film",
    description: "A final 35mm image from the series.",
  }
];

const galleryGrid = document.getElementById("galleryGrid");
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMedium = document.getElementById("modalMedium");
const modalDescription = document.getElementById("modalDescription");
const closeModalButton = document.getElementById("closeModal");
const modalBackdrop = document.querySelector(".modal-backdrop");

function openModal(photo) {
  modalImage.src = photo.file;
  modalImage.alt = photo.alt;
  modalTitle.textContent = photo.title;
  modalMedium.textContent = photo.medium;
  modalDescription.textContent = photo.description;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderGallery() {
  galleryGrid.innerHTML = "";
  
  photos.forEach((photo) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Open ${photo.title} photo`);
    button.innerHTML = `<img src="${photo.file}" alt="${photo.alt}">`;

    button.addEventListener("click", () => {
      openModal(photo);
    });

    galleryGrid.appendChild(button);
  });
}

closeModalButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

renderGallery();