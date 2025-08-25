import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";
import { csrfFetch } from "../../store/csrf";
import HtmlToText from "../HtmlToText/HtmlToText";

function ChatArea() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aiResponse = await csrfFetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    const answer = await aiResponse.json()
    setReply(answer.reply);

    return reply;
  };

  return (
    <div className="page-wrapper">
      <div className="ai-input-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="ai-input-field"
            />
          <button type="submit">Ask us!</button>
        </form>
        <div className="reply-area"><HtmlToText props={reply}/></div>
      </div>
    </div>
  );
}

export default ChatArea;
