const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray;

// Unsplash API
const count = 10;
const apiKey = "duLRyqRrXqr7n5FxwmgTB3vrsND4AVRspwa7DK2wt_c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
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

    // Put <img> inside <a>, then put both inside imageContainer
    item.append(img);
    imageContainer.append(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch errors
  }
}

// On load
getPhotos();
