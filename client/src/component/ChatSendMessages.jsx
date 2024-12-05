import { useState } from 'react';

export default function ChatSendMessage({ socket, username, room }) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className="pt-4 pl-5 pb-5 pr-4">
      <input
        className="p-[14px] mr-4 w-[60%] rounded-md border border-solid border-[#99d9ea] text-sm"
        placeholder='Mensagem...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="bg-[white] border rounded-md p-[14px] text-sm hover:bg-[#99d9ea]" onClick={sendMessage}>
        Enviar mensagem
      </button>
    </div>
  );
};
