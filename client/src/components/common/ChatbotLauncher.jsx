
import React, { useState } from "react";
import "./ChatbotLauncher.css";

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((previous) => !previous);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Outside click backdrop */}
      {isOpen && (
        <div
          className="chatbot-backdrop"
          onClick={closeChatbot}
          aria-hidden="true"
        />
      )}

      {/* Chatbot popup */}
      {isOpen && (
        <div className="chatbot-popup">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <img
                src="/chatbot-logo.png"
                alt="THE WOK Logo"
              />

              <div>
                <strong>THE WOK AI</strong>
                <small>Online Assistant</small>
              </div>
            </div>

            <button
              className="chatbot-close"
              onClick={closeChatbot}
              aria-label="Close chatbot"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Friend's chatbot */}
          <iframe
            src="https://YOUR-FRIENDS-CHATBOT-URL"
            title="THE WOK AI Chatbot"
            allow="clipboard-write"
          />
        </div>
      )}

      {/* Floating mascot launcher */}
      <button
        className={`chatbot-launcher ${isOpen ? "active" : ""}`}
        onClick={toggleChatbot}
        aria-label="Toggle THE WOK AI Assistant"
        aria-expanded={isOpen}
        title="Chat with THE WOK AI"
      >
        <span className="neon-aura" />

        <img
          src="/chatbot-logo.png"
          alt="THE WOK AI Assistant"
        />
      </button>
    </>
  );
};

export default ChatbotLauncher;
