import { useState, useEffect, useRef } from 'react';

export default function ChatMessages({ socket }) {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  useEffect(() => {
    socket.on('last_50_messages', (last_50_messages) => {
      last_50_messages = sortMessagesByDate(last_50_messages);
      last_50_messages.map((m) => {
        const newDate = formatDateFromTimestamp(parseInt(m.__createdtime__))
        m.__createdtime__ = newDate
      })
      setMessagesReceived(last_50_messages);
    });

    return () => socket.off('last_50_messages');
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  
  return (
    <div className="h-[680px] overflow-auto pt-[10px] pl-[10px] pb-[10px] pr-[40px]" ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className="bg-[#273469] rounded-md mb-[24px] max-w-[600px] p-3" key={i}>
          <div className='flex justify-between'>
            <span className="text-[#99d9ea] text-xs">{msg.username}</span>
            <span className="text-[#99d9ea] text-xs">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <div className="text-[#fff] break-words">{msg.message}</div>
          <br />
        </div>
      ))}
    </div>
  );
};
