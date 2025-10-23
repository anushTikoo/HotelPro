import { WiDaySunny, WiNightClear, WiDaySunnyOvercast } from "react-icons/wi";

function StaffCard({ name, role, phone, shift, action, className }) {
  let shiftIcon = null;
  let shiftColor = "";

  if (shift !== "Shift") {
    if (shift.toLowerCase() === "morning") {
      shiftIcon = <WiDaySunny className="w-5 h-5" />;
      shiftColor = "bg-amber-100 text-amber-700 border-amber-300";
    } else if (shift.toLowerCase() === "evening") {
      shiftIcon = <WiDaySunnyOvercast className="w-5 h-5" />;
      shiftColor = "bg-orange-100 text-orange-700 border-orange-300";
    } else if (shift.toLowerCase() === "night") {
      shiftIcon = <WiNightClear className="w-5 h-5" />;
      shiftColor = "bg-indigo-100 text-indigo-700 border-indigo-300";
    }
  }

  return (
    <div
      className={`grid grid-cols-5 gap-6 items-center text-center ${className}`}
    >
      <div className="font-semibold">{name}</div>
      <div className="font-semibold capitalize">{role}</div>
      <div className="font-medium text-sm">{phone}</div>
      <div>
        {shift === "Shift" ? (
          <div className="font-semibold">{shift}</div>
        ) : (
          <span
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${shiftColor} capitalize`}
          >
            {shiftIcon}
            {shift}
          </span>
        )}
      </div>
      <div>{action}</div>
    </div>
  );
}

export default StaffCard;