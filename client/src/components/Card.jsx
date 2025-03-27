export default function Card({ title, description, className, onClick }) {
    return (
      <div className={`card ${className}`} onClick={onClick}>
        <h2 className="font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
    );
  }
  