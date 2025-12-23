import React, { useEffect, useState } from 'react';

const VideoStream = () => {
  const [frameUrl, setFrameUrl] = useState("");
  const baseUrl = "https://dscgapi.share.zrok.io/single_frame/";

  useEffect(() => {
    let isMounted = True;
    
    const updateFrame = () => {
      if (!isMounted) return;
      // Добавляем timestamp, чтобы браузер не кешировал картинку
      const newUrl = `${baseUrl}?t=${Date.now()}`;
      
      // Предзагрузка кадра, чтобы не было мигания
      const img = new Image();
      img.src = newUrl;
      img.onload = () => {
        if (isMounted) {
          setFrameUrl(newUrl);
          // Как только этот кадр загрузился, сразу запрашиваем следующий. Это создаст максимально возможную плавность (FPS)
          setTimeout(updateFrame, 60); // ~15-16 FPS
        }
      };
      img.onerror = () => {
        if (isMounted) setTimeout(updateFrame, 1000); // Если ошибка, ждем секунду
      };
    };

    updateFrame();
    return () => { isMounted = false; };
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
