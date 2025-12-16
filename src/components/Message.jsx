import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef(null);
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = message?.senderId === authUser?._id;

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={
              isSender
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>

      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">
          12:45
        </time>
      </div>

      <div
        className={`chat-bubble ${
          !isSender ? 'bg-gray-200 text-black' : ''
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
