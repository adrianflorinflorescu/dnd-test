const ErrorMessage: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div>
      {message}
      <button onClick={onClose}>Dismiss</button>
    </div>
  );
};

export {
  ErrorMessage,
};