import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react"; 
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/movie" },
    { name: "Series", to: "/series" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 text-white
        transition-colors duration-300 ease-in-out
        ${isScrolled ? "bg-black/40" : "bg-transparent"}
      `}
    >
      <h1 className="pl-10 text-3xl font-bold text-blue-600">Cinemaplex</h1>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <IoMdClose size={24} /> : <FaBars size={24} />}
      </button>

      <ul
        className={`text-xl md:flex gap-16 pr-20 absolute md:static left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-300 ${
          open ? "top-16" : "-top-60"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.name} className="relative group text-2xl font-bold">
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className={`transition ${
                  isActive ? "text-blue-600" : "text-white"
                }`}
              >
                {item.name}
              </Link>

              <span
                className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                  isActive
                    ? "w-full bg-blue-600"
                    : "w-0 bg-blue-600 group-hover:w-full"
                }`}
              ></span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}