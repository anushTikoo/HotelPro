function AdminRoomCard({no, type, status, price, action, className=''}) {
  const formattedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : type;

  let statusColor = "bg-emerald-100 text-emerald-700 border-emerald-300";
  if (status === "occupied") statusColor = "bg-red-100 text-red-700 border-red-300";
  else if (status === "maintenance") statusColor = "bg-yellow-100 text-yellow-700 border-yellow-300"

  return (
    <div className={`grid grid-cols-5 gap-6 items-center bg-yellow- text-center bg-amber- ${className}`}>
      <div className="font-semibold">{no}</div>
      <div className="font-medium">{formattedType}</div>
      <div>
        {status === "Status" ? (
          <div>{status}</div>
        ) : (
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border-2 ${statusColor}`}>
            <span className="w-2 h-2 bg-current rounded-full"></span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>
      <div className="font-semibold">{price}</div>
      <div>{action}</div>
    </div>
  );
}

export default AdminRoomCard;