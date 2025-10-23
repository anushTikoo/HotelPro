import { FaUsers } from "react-icons/fa";

function UserCard({ user, room, dates, people, checkout, className }) {
  return (
    <div
      className={`grid grid-cols-5 gap-6 items-center text-center ${className}`}
    >
      <div className="font-semibold">{user}</div>
      <div className="font-semibold">{room}</div>
      <div className="font-medium text-sm">{dates}</div>
      <div className="font-semibold flex items-center justify-center gap-2">
        {typeof people === 'number' && <FaUsers className="text-gray-500 w-4 h-4" />}
        {people}
      </div>
      <div>{checkout}</div>
    </div>
  );
}

export default UserCard;