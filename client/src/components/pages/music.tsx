import React, { useState } from "react";

const Music = () => {
  const [isWhiteNoisePlaying, setIsWhiteNoisePlaying] = useState(false);
  const [playlist, setPlaylist] = useState<any[]>([]); // Store the playlist as an array of songs
  const [currentSong, setCurrentSong] = useState<string | null>(null); // Track the current song

  // Handle white noise toggle
  const toggleWhiteNoise = () => {
    setIsWhiteNoisePlaying((prevState) => !prevState);
  };

  // Handle playlist import (JSON)
  const handlePlaylistImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsedPlaylist = JSON.parse(reader.result as string);

          // Map over the playlist to generate Blob URLs for MP3 files
          const updatedPlaylist = parsedPlaylist.map((song: { name: string, url: string }) => {
            // If the URL is a local MP3 file, create a Blob URL
            if (song.url && song.url.endsWith(".mp3")) {
              const songBlob = new Blob([file], { type: "audio/mp3" });
              const songUrl = URL.createObjectURL(songBlob);
              return { ...song, url: songUrl }; // Update the song with the Blob URL
            }
            return song;
          });

          setPlaylist(updatedPlaylist); // Set the updated playlist
        } catch (error) {
          console.error("Error parsing playlist:", error);
        }
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  // Handle song play
  const playSong = (songUrl: string) => {
    setCurrentSong(songUrl); // Set the current song URL to play
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Music</h1>

      {/* Button container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      >
        {/* White Noise Button */}
        <button
          onClick={toggleWhiteNoise}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#AECCE4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            width: "200px",
            transition: "background-color 0.3s",
          }}
        >
          {isWhiteNoisePlaying ? "Stop White Noise" : "Play White Noise"}
        </button>

        {/* Import Playlist Button */}
        <label
          htmlFor="playlist-upload"
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            width: "200px",
            textAlign: "center",
            transition: "background-color 0.3s",
          }}
        >
          Import Playlist
        </label>
        <input
          type="file"
          id="playlist-upload"
          accept=".json,.mp3" // Accept both JSON and MP3 files
          onChange={handlePlaylistImport}
          style={{ display: "none" }} // Hide default file input
        />
      </div>

      {/* Playlist Display */}
      {playlist.length > 0 && (
        <div style={{ marginTop: "20px", color: "white" }}>
          <h3>Playlist:</h3>
          <ul>
            {playlist.map((song, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <span>{song.name}</span>{" "}
                <button
                  onClick={() => playSong(song.url)}
                  style={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    cursor: "pointer",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Current Song Display */}
      {currentSong && (
        <div style={{ marginTop: "20px" }}>
          <audio controls autoPlay>
            <source src={currentSong} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* White Noise Status */}
      {isWhiteNoisePlaying && (
        <p style={{ marginTop: "15px", fontSize: "14px", color: "white" }}>
          White Noise is playing...
        </p>
      )}
    </div>
  );
};

export default Music;
