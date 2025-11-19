import { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import Datepicker from "../../components/Datepicker";
import { ToastContainer, toast } from "react-toastify";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { SearchContext } from "./SearchContext";

function Home() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [people, setPeople] = useState(1);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const booking = searchParams.get("booking");

  const { setData } = useContext(SearchContext);

  const handleClick = () => {
    if (!checkIn || !checkOut) {
      if (!toast.isActive(1))
        toast.error("Please Fill All The Details Before Searching!", {
          toastId: 1,
        });
    } else {
      setData({ checkIn, checkOut, people });
      navigate("/guest/searchresults");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (booking == "true") toast.success("Booking Confirmed");
    else if (booking === "false")
      toast.error("Booking Failed, Please Try Again");
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative w-full h-screen">
        <ToastContainer position="top-center" autoClose={2500} />
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/images/background.avif"
          fetchPriority="high"
          alt="background image"
        ></img>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

        <div className="relative flex flex-col gap-16 justify-center items-center w-full h-full">
          <h1 className="font-extrabold text-white text-8xl drop-shadow-2xl animate-fade-in text-center">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Stay
            </span>
            ...
          </h1>

          <div className="bg-white/95 rounded-full border-4 border-amber-400 shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-500">
            <div className="flex h-15 items-center justify-center text-[#2C2C2C]">
              <Datepicker
                text="Check In"
                className=""
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
              />

              <Datepicker
                text="Check Out"
                selected={checkOut}
                onChange={(date) => {
                  if (checkIn && date >= checkIn) setCheckOut(date);
                }}
              />

              <div className="flex items-center gap-6 px-6 ">
                <button
                  aria-label="Decrease people count"
                  onClick={() => people > 1 && setPeople(people - 1)}
                  disabled={people <= 1}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    people > 1
                      ? "hover:bg-red-100 hover:text-red-600 hover:scale-110 active:scale-95 cursor-pointer"
                      : "opacity-30 cursor-not-allowed"
                  }`}
                >
                  <IoPersonRemove className="w-6 h-6" />
                </button>

                <p className="font-bold text-xl min-w-[3ch] text-center bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  {people}
                </p>

                <button
                  aria-label="Increase people count"
                  onClick={() => setPeople(people + 1)}
                  className="p-2 rounded-lg hover:bg-green-100 hover:text-green-600 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <IoPersonAdd className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={handleClick}
                className="text-center flex justify-center items-center bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-r-full font-bold text-lg px-10 py-6 hover:from-teal-700 hover:to-teal-800 hover:shadow-xl h-full active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
