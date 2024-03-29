const username = "your-username";
const api_key = "your-lastfm-api-key";
const getUserData = () => {
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      let track = data.recenttracks.track[0];
      let trackName = track.name;
      let albumName = track.album["#text"];
      let artistName = track.artist["#text"];
      let albumCover = track.image[3]["#text"];
      let isPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
      document.getElementById("music-title").innerText = trackName;
      document.getElementById("album-name").innerText = albumName;
      document.getElementById("artist-name").innerText = artistName;
      document.getElementById("album-cover").src = albumCover;
      document.getElementById(
        "music-link"
      ).href = `https://www.last.fm/music/${encodeURIComponent(
        artistName
      )}/_/${encodeURIComponent(trackName)}`;

      document.getElementById("playing-status").innerText = isPlaying
        ? "Now playing:"
        : "Recently played:";
    });
};
getUserData();
// Update the widget every 10 seconds //
setInterval(getUserData, 10 * 1000);
