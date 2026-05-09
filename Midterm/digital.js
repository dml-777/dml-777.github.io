const photos = [
  {
    file: "digital/image1.jpg",
    title: "Jazz",
    medium: "2025",
    description: "Kodak Digital Camera",
  },
  {
    file: "digital/image2.jpg",
    title: "Photobooth",
    medium: "2026",
    description: "Iphone 15",
  },
  {
    file: "digital/image3.jpg",
    title: "Empire State",
    medium: "2024",
    description: "Iphone 15",
  },
  {
    file: "digital/image4.jpg",
    title: "Brooklyn Bridge",
    medium: "2024",
    description: "Iphone 15",
  },
  {
    file: "digital/image5.jpg",
    title: "Gogo Juice",
    medium: "2026",
    description: "Iphone 15",
  },
  {
    file: "digital/image6.jpg",
    title: "liberty",
    medium: "2025",
    description: "Iphone 15",
  },
  {
    file: "digital/image7.jpg",
    title: "exitexitexit",
    medium: "2025",
    description: "Iphone 15",
  },
  {
    file: "digital/image8.jpg",
    title: "Skyline",
    medium: "2024",
    description: "Iphone 15",
  },
  {
    file: "digital/image9.jpg",
    title: "Met tonight?",
    medium: "2025",
    description: "Kodak Digital Camera",
  },
  {
    file: "digital/image10.jpg",
    title: "FIDI",
    medium: "2024",
    description: "Canon DSLR",
   },
  {
    file: "digital/image11.jpg",
    title: "Carousel",
    medium: "2025",
    description: "Iphone 15",
   },
  {
    file: "digital/image12.jpg",
    title: "Sparkly",
    medium: "2025",
    description: "Iphone 15",
   },
  {
    file: "digital/image13.jpg",
    title: "Roman",
    medium: "2025",
    description: "Canon DSLR"
   },
  {
    file: "digital/image14.jpg",
    title: "Beacon hill",
    medium: "2026",
    description: "Iphone 15",
   },
  {
    file: "digital/image15.jpg",
    title: "All Around us",
    medium: "2025",
    description: "Kodak Digital Camera",
  },
  {
    file: "digital/image16.jpg",
    title: "Scholastic",
    medium: "2026",
    description: "Kodak Digital Camera",
  },
  {
    file: "digital/image17.jpg",
    title: "Hiding",
    medium: "2025",
    description: "Kodak Digital Camera",
  },
  {
    file: "digital/image18.jpg",
    title: "NYU tuition",
    medium: "2025",
    description: "Canon DSLR",
  },
  {
    file: "digital/image19.jpg",
    title: "Marias",
    medium: "2025",
    description: "Kodak Digital Camera"
  },
  {
    file: "digital/image20.jpg",
    title: "Silence",
    medium: "2025",
    description: "Iphone 15",
  },
  {
    file: "digital/image21.jpg",
    title: "Tame Impala",
    medium: "2025",
    description: "Kodak Digital Camera",
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