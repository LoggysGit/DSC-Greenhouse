import React, { useEffect, useState, useRef } from 'react';

const VideoStream = () => {
  const [frameUrl, setFrameUrl] = useState(null);
  const baseUrl = "https://dscgapi.share.zrok.io/single_frame/";
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const fetchFrame = async () => {
      if (!isMounted.current) return;

      try {
        const response = await fetch(`${baseUrl}?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'skip_zrok_interstitial': 'true'
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          
          // Clear URL
          setFrameUrl(prev => {
            if (prev) URL.revokeObjectURL(prev);
            return objectUrl;
          });
        }
      } catch (err) {
        console.error("Frame fetch error:", err);
      }

      if (isMounted.current) setTimeout(fetchFrame, 20); // 20 ms between requests
    };

    fetchFrame();

    return () => {
      isMounted.current = false;
      if (frameUrl) URL.revokeObjectURL(frameUrl);
    };
  }, []);

  return (
    <div>
      {frameUrl ? (
        <img
          src={frameUrl}
          alt="Live Greenhouse Stream"
          id="stream-window"
        />
      ) : (
        <div style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          <span>Initialization...</span>
        </div>
      )}
    </div>
  );
};

export default VideoStream;
