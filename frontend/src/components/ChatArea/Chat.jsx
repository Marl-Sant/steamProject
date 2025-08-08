import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";

function ChatArea() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aiResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    setReply(aiResponse);

    return reply;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Ask us!</button>
      </form>
      <div>{reply}</div>
    </div>
  );
}

export default ChatArea;
