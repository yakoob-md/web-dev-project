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
    try{
        let url = `https://www.theaudiodb.com/api/v1/json/${api_key}/album.php?i=${albumId}`;
        let response = await fetch(url);
        response = await response.json();
        let data = (response.album[0]);
        console.log(data);
        display(data);}catch(e){
            console.log("error caught",e);
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
    let div = document.getElementById("musicInfo");
    div.innerHTML = `<p>${message}</p>`;
}
