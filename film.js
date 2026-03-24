const photos = [
  {
    file: "film/photo1.jpg",
    title: "3-course meal",
    description: "Fujifilm 35mm film",
  },
  {
    file: "film/photo2.jpg",
    title: "Gr8 summer",
    description: "Fujifilm 35mm film",
  },
  {
    file: "film/photo3.jpg",
    title: "House of balloons",
    description: "Fujifilm 35mm ",
  },
  {
    file: "film/photo4.jpg",
    title: "Oxford grad '24",
    description: "Fujifilm 35mm film",
  },
  {
    file: "film/photo5.jpg",
    title: "Hotdog bday",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo6.jpg",
    title: "With the flow",
    description:"Fujifilm 35mm film"
  },
  {
    file: "film/photo7.jpg",
    title: "Ferry views",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo8.jpg",
    title: "03/06/26",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo9.jpg",
    title: "Capture Me",
    description: "Fujifilm 35mm ",
  },
  {
    file: "film/photo10.jpg",
    title: "Buddakan",
    description: "35mm film",
  },
  {
    file: "film/photo11.jpg",
    title: "Siblings",
    description: "35mm film",
  },
  {
    file: "film/photo12.jpg",
    title: "Chinatown",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo13.jpg",
    title: "Moi",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo14.jpg",
    title: "Burgers",
    description: "Fujifilm 35mm",
  },
  {
    file: "film/photo15.jpg",
    title: "Fish x Amtrak",
    description: "Canon 35mm film",
  },
  {
    file: "film/photo16.jpg",
    title: "43 Bay",
    description: "Canon 35mm film",
  },
  {
    file: "film/photo17.jpg",
    title: "Opera House",
    description: "Canon 35mm film",
  },
  {
    file: "film/photo18.jpg",
    title: "Coy",
    description: "Canon 35mm film",
  },
   {
    file: "film/photo19.jpg",
    title: "Film on Film",
    description: "Canon 35mm film",
  },
   {
    file: "film/photo20.jpg",
    title: "Planning",
    description: "Canon 35mm film",
  },
   {
    file: "film/photo21.jpg",
    title: "Pause?",
    description: "Canon 35mm film",
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