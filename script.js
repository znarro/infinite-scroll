const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray;

// Unsplash API
const count = 10;
const apiKey = "duLRyqRrXqr7n5FxwmgTB3vrsND4AVRspwa7DK2wt_c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links & photos, add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

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
