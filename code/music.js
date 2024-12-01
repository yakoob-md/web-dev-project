
document.addEventListener("DOMContentLoaded", function () {
  // Handle navbar buttons
  const navItems = document.querySelectorAll(".navbar .nav-item[data-page]");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetPage = item.getAttribute("data-page"); // Get the target page
      if (targetPage) {
        window.location.href = targetPage; // Redirect to the target page
      }
    });
  });

  // Handle BMI button
  const bmiButton = document.getElementById("bmi-button");
  if (bmiButton) {
    bmiButton.addEventListener("click", function () {
      // Navigate to bmi.html
      window.location.href = "bmi.html";
    });
  }

  // Handle music album search
  let api_key = "2";
  let btn = document.getElementById("musicbtn");
  let search = document.getElementById("musicSearchInput");
  let albumId;

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    albumId = search.value.trim();
    if (albumId) {
      fetchMusic(albumId);
    } else {
      console.log("Please enter a valid album ID or name.");
    }
  });

  async function fetchMusic(albumId) {
    try {
      let url = `https://www.theaudiodb.com/api/v1/json/${api_key}/album.php?i=${albumId}`;
      let response = await fetch(url);
      response = await response.json();
      if (response.album && response.album.length > 0) {
        let data = response.album[0];
        console.log(data);
        display(data);
      } else {
        displayError("No album found for the given ID.");
      }
    } catch (e) {
      console.log("Error caught", e);
      displayError("An error occurred while fetching the album data.");
    }
  }

  function display(data) {
    let div = document.getElementById("albumInfo");
    div.innerHTML = `
      <h2>Album: ${data.strAlbum}</h2>
      <img src="${data.strAlbumThumb}" alt="Album Thumbnail">
      <p>Artist: ${data.strArtist}</p>
      <p>Year Released: ${data.intYearReleased}</p>
      <p>Genre: ${data.strGenre}</p>
      <p>Description: ${data.strDescriptionEN || "No description available."}</p>
    `;
  }

  function displayError(message) {
    let div = document.getElementById("albumInfo");
    div.innerHTML = `<p>${message}</p>`;
  }
});

