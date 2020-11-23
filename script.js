const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray;

// Unsplash API
let imgCount = 5;
const apiKey = "duLRyqRrXqr7n5FxwmgTB3vrsND4AVRspwa7DK2wt_c";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

// Check if all images were loaded
function checkIfImageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    console.log("imgCount: ", imgCount);
    ready = true;
    // Loader works until the first group of images is loaded, then it's hidden
    loader.hidden = true;
    increaseImagesToLoadCount();
  }
}

function increaseImagesToLoadCount() {
  imgCount = 30;
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;
}

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event on load img
    img.addEventListener("load", checkIfImageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer
    item.append(img);
    imageContainer.append(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  console.log("apiUrl: ", apiUrl);
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch errors
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
