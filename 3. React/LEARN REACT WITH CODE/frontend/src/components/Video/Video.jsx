import { useRef } from "react";

function Video() {
  const videoRef = useRef(null);

  function playVideo() {
    videoRef.current.play();
  }

  function pauseVideo() {
    videoRef.current.pause();
  }

  return (
    <div className="container">
      <h1>Video Player</h1>

      <video ref={videoRef} width="500" controls>
        <source src="nature.mp4" type="video/mp4" />
      </video>

      <br />

      <button onClick={playVideo}>Play</button>

      <button onClick={pauseVideo}>Pause</button>
    </div>
  );
}

export default Video;
