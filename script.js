// Unsplash API
const count = 10;
const apiKey = "duLRyqRrXqr7n5FxwmgTB3vrsND4AVRspwa7DK2wt_c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Catch errors
  }
}

// On load
getPhotos();
