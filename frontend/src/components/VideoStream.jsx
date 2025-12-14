import React from 'react';

const VideoStream = () => {
  const streamUrl = "/api/video_stream/"; //Django stream URL

  return (
    <div>
      <img
        src={streamUrl} 
        alt="Camera stream" 
        id="stream-window"
      />
    </div>
  );
};

export default VideoStream;