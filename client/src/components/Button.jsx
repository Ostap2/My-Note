// import './Button.css';

export default function Button({ onClick, children, className = '', ...props }) {
  return (
    <button className={`button ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
