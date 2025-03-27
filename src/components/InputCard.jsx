
export default function Input({ placeholder, value, onChange, className }) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${className}`}
      />
    );
  }
  