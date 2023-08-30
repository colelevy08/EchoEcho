import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const playerRef = useRef();

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.document.body.appendChild(tag);
    }

    function createPlayer() {
      const videoIds = ['HNBCVM4KbUM', 'rBrd_3VMC3c', 'YDgqP_4Q_fM', '2IL-C7sq5Ow', 'Dv3Vj30KjMY', 'B7GfmFexXgs', 'RlPNh_PBZb4', '3c5ocCRSRAI', 'Fpn1imb9qZg', '6SFNW5F8K9Y', 'QrR_gm6RqCo', '4iQmPv_dTI0'];
      const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
      new window.YT.Player(playerRef.current, {
        height: '360',
        width: '640',
        videoId: randomVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1
        }
      });
    }
  }, []);

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">EchoEcho</h1>
      <ul className="space-y-2">
        <li><Link className="text-blue-500 underline" to="/HomePage">Login/Signup</Link></li>
        <li><Link className="text-blue-500 underline" to="/products">Marketplace</Link></li>
        <li><Link className="text-blue-500 underline" to="/MyLikes">Wishlist</Link></li>
        <li><Link className="text-blue-500 underline" to="/reviews">User Reviews</Link></li>
        <li><Link className="text-blue-500 underline" to="/users">Friends</Link></li>
        <li><Link className="text-blue-500 underline" to="/orders">Orders</Link></li>
      </ul>
      <div className="video-container">
        <div ref={playerRef}></div>
      </div>
    </div>
  );
}

export default Dashboard;
