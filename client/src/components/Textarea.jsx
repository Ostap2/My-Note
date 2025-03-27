
export default function Textarea({ placeholder, value, onChange, className }) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`textarea ${className}`}
      />
    );
  }
  