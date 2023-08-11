import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, and useRef
import { Link } from 'react-router-dom';
import '../App.css'; // CSS import

function Dashboard() {
  const [player, setPlayer] = useState(null);
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
      const videoIds = ['HNBCVM4KbUM', 'rBrd_3VMC3c', 'YDgqP_4Q_fM', '2IL-C7sq5Ow', 'Dv3Vj30KjMY', 'B7GfmFexXgs', 'RlPNh_PBZb4', '3c5ocCRSRAI', 'Fpn1imb9qZg', '6SFNW5F8K9Y', 'QrR_gm6RqCo', '4iQmPv_dTI0', ];
      const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
      setPlayer(new window.YT.Player(playerRef.current, {
        height: '360',
        width: '640',
        videoId: randomVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1
        }
      }));
    }
  }, []);

  return (
    <div className="dashboard">
      <h1>EchoEcho</h1>
      <ul className="dashboard-links">
        <li><Link className="dashboard-link" to="/products">Product Listings</Link></li>
        <li><Link className="dashboard-link" to="/reviews">Reviews</Link></li>
        <li><Link className="dashboard-link" to="/users">Friends</Link></li>
        <li><Link className="dashboard-link" to="/orders">Orders</Link></li>
        <li><Link className="dashboard-link" to="/MyLikes">Favorites</Link></li>
        <li><Link className="dashboard-link" to="/HomePage">HomePage</Link></li>
      </ul>
      <div className="video-container">
        <div ref={playerRef}></div>
      </div>
    </div>
  );
}

export default Dashboard;
