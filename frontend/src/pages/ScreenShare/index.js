import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScreenShare.css';

const ScreenShare = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Navigate to the screen share page
    window.location.href = '/screen-share';
    return false;
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/screen-share/${roomId}`);
    }
  };

  return (
    <div className="screen-share-container">
      <div className="screen-share-card">
        <h2>Ekran Paylaşımı</h2>
        <p>Yeni bir oda oluşturun veya mevcut bir odaya katılın</p>
        
        <form onSubmit={handleJoinRoom} className="room-form">
          <div className="form-group">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Oda ID'si girin"
              className="form-input"
            />
          </div>
          
          <div className="button-group">
            <a 
              href="/screen-share" 
              onClick={handleCreateRoom}
              className="btn btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Yeni Oda Oluştur
            </a>
            
            <button 
              type="submit" 
              className="btn btn-secondary"
              disabled={!roomId.trim()}
            >
              Odaya Katıl
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreenShare;
