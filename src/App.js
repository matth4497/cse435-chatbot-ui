import "./App.css";
import { useRef, useEffect, useState } from "react";

const conversation = [];

function App() {
  const [sentMessage, setSentMessage] = useState(null);
  const [botResponse, setBotResponse] = useState(null);
  const allCheckboxRef = useRef();
  const polCheckboxRef = useRef();
  const envCheckboxRef = useRef();
  const techCheckboxRef = useRef();
  const healthCheckboxRef = useRef();
  const eduCheckboxRef = useRef();
  const messageInputRef = useRef();

  const getFiltersList = () => {
    const retVal = [];
    if (allCheckboxRef.current.checked) {
      retVal.push("Politics");
      retVal.push("Environment");
      retVal.push("Technology");
      retVal.push("Healthcare");
      retVal.push("Education");
      return retVal;
    }
    if (polCheckboxRef.current.checked) {
      retVal.push("Politics");
    }
    if (envCheckboxRef.current.checked) {
      retVal.push("Environment");
    }
    if (techCheckboxRef.current.checked) {
      retVal.push("Technology");
    }
    if (healthCheckboxRef.current.checked) {
      retVal.push("Healthcare");
    }
    if (eduCheckboxRef.current.checked) {
      retVal.push("Education");
    }
    return retVal;
  };

  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        setSentMessage(messageInputRef.current.value);
        messageInputRef.current.value = "";
      }
    });
  }, []);

  useEffect(() => {
    const getBotResponse = async (userMessage) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accepts: "application/json",
        },
        body: JSON.stringify({
          name: "/get_response",
          input: userMessage,
          filters: getFiltersList(),
        }),
      };
      const data = await fetch(
        "http://localhost:9999/get_response",
        requestOptions
      );
      const jsonData = await data.json();
      const botResponse = jsonData["output"];
      setBotResponse(botResponse);
    };

    if (sentMessage) {
      conversation.push({ messageType: "User", message: sentMessage });
      getBotResponse(sentMessage);
      setSentMessage(null);
    }

    if (botResponse) {
      conversation.push({ messageType: "Agent", message: botResponse });
      window.scrollTo(0, document.body.scrollHeight);
      setSentMessage(null);
      setBotResponse(null);
    }
  }, [sentMessage, botResponse]);

  return (
    <div className="grid-container">
      <div className="chat">
        <div className="conversation-container">
          <ul>
            {conversation.map((m) => {
              return (
                <p className={m["messageType"]}>
                  {m["messageType"]}: {m["message"]}
                </p>
              );
            })}
          </ul>
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
