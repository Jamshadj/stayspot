import React, { useEffect, useState } from 'react';
import '../UserChats/UserChat.css';
import { getHostById } from '../../../api/userApi';

function ChatBox({ chat, currentUserId }) {
  const [hostData, setHostData] = useState(null);

  useEffect(() => {
    if (chat) { // Check if chat is not null before proceeding
      const hostId = chat.members.find((id) => id !== currentUserId);
      const getHostData = async () => {
        try {
          const response = await getHostById(hostId);
          setHostData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      getHostData();
    }
  }, [chat, currentUserId]);

  return (
    <div className='ChatBox-container'>
      {/* Render the chatbox content */}
      {hostData && (
        <div className='online-dot'>
          <img src={hostData.image} alt="" />
        </div>
      )}
    </div>
  );
}

export default ChatBox;
