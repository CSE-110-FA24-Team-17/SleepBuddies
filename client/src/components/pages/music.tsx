import React, { useState, useEffect, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons"; // for customizing the icons

import "../../css/music.css"; // for styling

// Import sound files for white noise options
import whiteNoise from "../../assets/white-noise.mp3";
import rainSound from "../../assets/rain-sound.mp3";
import oceanSound from "../../assets/ocean-sound.mp3";
import forestSound from "../../assets/forest-sound.mp3";
import coverPhoto from "../../assets/cover-photo.jpg"; // White Noise Playlist cover image
import musicPhoto from "../../assets/music-photo.jpg"; // Music Playlist cover image

import sleep from "../../assets/sleep-music1.mp3";
import relax from "../../assets/calm-music.mp3";
import piano from "../../assets/piano-music.mp3";
import slowMusic from "../../assets/slow-music.mp3";

// Define sound playlists
const whiteNoiseSounds = [
  { name: "White Noise", file: whiteNoise },
  { name: "Rain", file: rainSound },
  { name: "Ocean", file: oceanSound },
  { name: "Forest", file: forestSound },
];

const musicSounds = [
  { name: "Sleep Time", file: sleep},
  { name: "Relax Time", file: relax},
  { name: "Calming Piano", file: piano},
  { name: "Slow Music", file: slowMusic},
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Play state
  const [currentIndex, setCurrentIndex] = useState(0); // Current track index
  const [currentPlaylist, setCurrentPlaylist] = useState(whiteNoiseSounds); // State for current playlist
  const audioRef = useRef(new Audio(currentPlaylist[0].file)); // Ref for audio element

  // Preload sounds to avoid delays
  useEffect(() => {
    // Only preload sounds if we switch playlists
    currentPlaylist.forEach((sound) => {
      const audio = new Audio(sound.file);
      audio.load();
    });
  }, [currentPlaylist]);

  // Update the audio source whenever the currentIndex changes
  useEffect(() => {
    audioRef.current.src = currentPlaylist[currentIndex].file;
    if (isPlaying) {
      audioRef.current.play().catch((error) => console.error("Playback error:", error));
    }
  }, [currentIndex, currentPlaylist, isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    audioRef.current.pause();
    const newIndex = currentPlaylist.findIndex((sound) => sound.file === e.target.value);
    setCurrentIndex(newIndex);
    setIsPlaying(false); // Reset play state
  };

  const stopPlayback = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const playNextTrack = () => {
    stopPlayback(); // Stop current playback
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentPlaylist.length); // Cycle to the next track
  };

  const playPreviousTrack = () => {
    stopPlayback(); // Stop current playback
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length); // Cycle to the previous track
  };

  // Function to switch between playlists
  const switchPlaylist = (playlist: string) => {
    if (playlist === "music") {
      setCurrentPlaylist(musicSounds);
    } else {
      setCurrentPlaylist(whiteNoiseSounds);
    }
    setCurrentIndex(0); // Reset to first track of the new playlist
    setIsPlaying(false); // Stop playback when switching
  };

  return (
    <div className="component">
      {/* Buttons to switch between playlists */}
      <div className="playlistSwitcher">
        <button onClick={() => switchPlaylist("whiteNoise")}>White Noise Playlist</button>
        <button onClick={() => switchPlaylist("music")}>Music Playlist</button>
      </div>

      <h2
        style={{
          fontSize: "4em",  // Adjust the size of the font
          color: "#6a69ae",   // Change the color
          fontFamily: "Arial, sans-serif", // Specify a font
          marginBottom: "0.5em", // Add some space below the title
        }}
      >
        Now Playing
      </h2>

      {/* Display cover photo based on the playlist */}
      <img className="musicCover" src={currentPlaylist === musicSounds ? musicPhoto : coverPhoto} alt="Music cover" />

      <div>
        <h3 className="title">{currentPlaylist[currentIndex].name}</h3>
        <p className="subTitle">Soothing Sounds</p>
      </div>

      <div>
        <label htmlFor="soundSelector" style={{ color: "#6a69ae", marginBottom: "4em", fontSize: "2.5em"}}>
          Choose Sound:
        </label>
        <select
          id="soundSelector"
          className="soundSelector"
          onChange={handleSoundChange}
          value={currentPlaylist[currentIndex].file}
          style={{
            display: "block",
            margin: "1em auto",
            padding: "1em",
            fontSize: "1.5em",
            borderRadius: "10px",
            border: "3px solid #6a69ae",
            width: "55%",
            color: "#4f4e8e"
          }}
        >
          {currentPlaylist.map((sound, index) => (
            <option key={index} value={sound.file}>
              {sound.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button className="playButton" onClick={playPreviousTrack} aria-label="skip previous">
          <IconContext.Provider value={{ size: "8em", color: "#6a69ae" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>

        {!isPlaying ? (
          <button className="playButton" onClick={togglePlayPause} aria-label="play">
            <IconContext.Provider value={{ size: "8em", color:  "#6a69ae" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={togglePlayPause} aria-label="pause">
            <IconContext.Provider value={{ size: "8em", color:  "#6a69ae" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}

        <button className="playButton" onClick={playNextTrack} aria-label="skip next">
          <IconContext.Provider value={{ size: "8em", color:  "#6a69ae" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
