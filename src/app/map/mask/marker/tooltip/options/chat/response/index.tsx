// App imports
import './styles.scss';

export const Response = ({ markerId, responseData }: any) => {
  const messages = responseData?.[markerId] || [];

  return (
    <div className="chat-history">
      {messages.map((msg: any, index: any) => (
        <div
          key={index}
          className={`chat-message ${msg.sender === 'assistant' ? 'assistant' : 'user'}`}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

Response.displayName = 'Response';