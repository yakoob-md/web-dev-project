// Define all page navigation icons and set up click event listeners
let home = document.getElementById("home");
let workout = document.getElementById("workout");
let docs = document.getElementById("docs");
let schedule = document.getElementById("schedule");

let bmi = document.getElementById("bmiButton");
bmi.addEventListener("click",()=>{
    window.location.href = "bmi.html";
})

home.addEventListener("click", () => { window.location.href = 'arena.html'; });
workout.addEventListener("click", () => { window.location.href = 'workout.html'; });
docs.addEventListener("click", () => { window.location.href = 'docs.html'; });
schedule.addEventListener("click", () => { window.location.href = 'schedule.html'; });

// Music modal functionality
let music = document.getElementById('musicIcon');
music.addEventListener("click", openModel); // Trigger modal open on click

let model = document.getElementById('musicDialog');

function openModel() {
  model.style.display = 'flex'; // Show modal
  document.body.classList.add('frozen');
}

function closeModel() {
  model.style.display = 'none'; // Hide modal
  document.body.classList.remove('frozen');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === model) {
    closeModel();
  }
};

// Search album using TheAudioDB API
async function searchAlbum() {
  const albumId = document.getElementById('musicInput').value;
  if (!albumId) {
    alert("Please enter an album ID");
    return;
  }

  const API_KEY = 2; // Replace with your actual TheAudioDB API Key
  try {
    const response = await fetch(`https://www.theaudiodb.com/api/v1/json/${API_KEY}/album.php?i=${albumId}`);
    const data = await response.json();
    console.log(data);
    
    if (data.album) {
      displayAlbumInfo(data.album[0]);
    } else {
      document.getElementById('albumInfo').innerHTML = '<p>No album found.</p>';
    }
  } catch (error) {
    console.error("Error fetching album data:", error);
  }
}

// Display album information in modal
function displayAlbumInfo(album) {
  const albumInfo = document.getElementById('albumInfo');
  albumInfo.innerHTML = `
    <h2>${album.strAlbum}</h2>
    <img src="${album.strAlbumThumb}" alt="${album.strAlbum} Thumbnail">
    <p><strong>Artist:</strong> ${album.strArtist}</p>
    <p><strong>Released:</strong> ${album.intYearReleased}</p>
    <p><strong>Genre:</strong> ${album.strGenre}</p>
    <p><strong>Description:</strong> ${album.strDescriptionEN}</p>
  `;
}
