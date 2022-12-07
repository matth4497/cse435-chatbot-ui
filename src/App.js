import "./App.css";
import { useRef, useEffect, useState } from "react";

const List = ({ items }) => {
  <ul>
    {items.map((item, i) => (
      <p className={item.messageType} key={i}>
        {item.messageType}: {item.message}
      </p>
    ))}
  </ul>;
};

const getBotResponse = (userMessage) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "/get_response", input: userMessage }),
  };
  fetch("/get_response", requestOptions).then((response) => {
    console.log(response);
    return response;
  });
};

const conversation = [];

function App() {
  const [sentMessage, setSentMessage] = useState(null);
  const allCheckboxRef = useRef();
  const polCheckboxRef = useRef();
  const envCheckboxRef = useRef();
  const techCheckboxRef = useRef();
  const healthCheckboxRef = useRef();
  const eduCheckboxRef = useRef();
  const messageInputRef = useRef();

  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        setSentMessage(messageInputRef.current.value);
        messageInputRef.current.value = "";
      }
    });
  }, []);

  useEffect(() => {
    if (sentMessage) {
      conversation.push({
        messageType: "User",
        message: sentMessage,
      });
      const response = getBotResponse(sentMessage);
      conversation.push({ messageType: "Agent", message: response });
      setSentMessage(null);
    }
  }, [sentMessage]);

  return (
    <div className="grid-container">
      <div className="chat">
        <div className="conversation-container">
          <List items={conversation} />
        </div>
        <div className="message-input-div">
          <input className="message-input" type="text" ref={messageInputRef} />
          <button
            className="send-button"
            onClick={() => {
              setSentMessage(messageInputRef.current.value);
              messageInputRef.current.value = "";
              messageInputRef.current.focus();
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div className="sidebar">
        <label className="sidebar-checkbox-label">
          <input
            className="politics-checkbox"
            type="checkbox"
            ref={polCheckboxRef}
            onClick={() => {
              allCheckboxRef.current.checked = false;
            }}
          />
          Politics
        </label>
        <br />
        <label className="sidebar-checkbox-label">
          <input
            className="enviroment-checkbox"
            type="checkbox"
            ref={envCheckboxRef}
            onClick={() => {
              allCheckboxRef.current.checked = false;
            }}
          />
          Enviroment
        </label>
        <br />
        <label className="sidebar-checkbox-label">
          <input
            className="technology-checkbox"
            type="checkbox"
            ref={techCheckboxRef}
            onClick={() => {
              allCheckboxRef.current.checked = false;
            }}
          />
          Technology
        </label>
        <br />
        <label className="sidebar-checkbox-label">
          <input
            className="healthcare-checkbox"
            type="checkbox"
            ref={healthCheckboxRef}
            onClick={() => {
              allCheckboxRef.current.checked = false;
            }}
          />
          Healthcare
        </label>
        <br />

        <label className="sidebar-checkbox-label">
          <input
            className="education-checkbox"
            type="checkbox"
            ref={eduCheckboxRef}
            onClick={() => {
              allCheckboxRef.current.checked = false;
            }}
          />
          Education
        </label>
        <br />

        <label className="sidebar-checkbox-label">
          <input
            defaultChecked={true}
            ref={allCheckboxRef}
            className="all-checkbox"
            type="checkbox"
            onClick={() => {
              allCheckboxRef.current.checked = true;
              polCheckboxRef.current.checked = false;
              envCheckboxRef.current.checked = false;
              techCheckboxRef.current.checked = false;
              healthCheckboxRef.current.checked = false;
              eduCheckboxRef.current.checked = false;
            }}
          />
          All
        </label>
        <br />
      </div>
    </div>
  );
}

export default App;
