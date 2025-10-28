// === FILTER BUTTONS FUNCTIONALITY ===
const filterButtons = document.querySelectorAll(".filters button");
const allImages = document.querySelectorAll(".gallery .image");
let currentCategory = "all";
let currentIndex = 0;

function filterImages(category) {
  currentCategory = category;
  currentIndex = 0;
  updateVisibleImages();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    filterImages(button.getAttribute("data-filter"));
  });
});

// === SHOW / HIDE IMAGES (FILTER + SLIDER COMBINED) ===
function updateVisibleImages() {
  // Get images matching current filter
  const visibleImages = Array.from(allImages).filter(img =>
    currentCategory === "all" || img.getAttribute("data-category") === currentCategory
  );

  // Hide all first
  allImages.forEach(img => img.style.display = "none");

  // Then show only the current 3 images
  for (let i = currentIndex; i < currentIndex + 3 && i < visibleImages.length; i++) {
    visibleImages[i].style.display = "block";
  }

  // Enable/disable buttons
  document.getElementById("prevBtn").disabled = currentIndex === 0;
  document.getElementById("nextBtn").disabled = currentIndex + 3 >= visibleImages.length;
}

// === NEXT / PREVIOUS BUTTONS FUNCTIONALITY ===
document.getElementById("nextBtn").addEventListener("click", () => {
  const visibleImages = Array.from(allImages).filter(img =>
    currentCategory === "all" || img.getAttribute("data-category") === currentCategory
  );
  if (currentIndex + 3 < visibleImages.length) {
    currentIndex++;
    updateVisibleImages();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateVisibleImages();
  }
});

// Initialize
updateVisibleImages();
