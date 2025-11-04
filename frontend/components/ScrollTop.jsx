import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

function ScrollTopButton() {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsBelow(true);
      } else {
        setIsBelow(false);
      }
    });
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isBelow && (
        <button className="fixed bottom-[50px] right-[50px] duration-300 ease-out bg-slate-700 rounded-2xl p-3"
        onClick={scrollTop}>
          <FaChevronUp size={32}/>
        </button>
      )}
    </div>
  );
}

export default ScrollTopButton;
