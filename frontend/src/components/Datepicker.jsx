import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Datepicker = ({ text, selected, onChange, className='' }) => {
  const CustomInput = forwardRef((props, ref) => {
    const { value, onClick } = props;
    return (
      <button
        ref={ref}
        className={`group flex items-center gap-3 px-6 py-4 cursor-pointer transition-all duration-300 ${className}`}
        onClick={onClick}
      >
        <FaCalendarAlt className="w-5 h-5 text-teal-600 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{text}</span>
          <p className="text-base font-semibold text-gray-800 group-hover:text-teal-700 transition-colors duration-300">
            {value || "Select Date"}
          </p>
        </div>
      </button>
    );
  });

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      customInput={<CustomInput />}
      dateFormat={"dd MMM yyyy"}
      minDate={new Date()}
      className="custom-datepicker"
    />
  );
};

export default Datepicker;