import { IoMdClose } from "react-icons/io";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`z-100 fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/80" : "invisible"
      }`}
    >
      <div
        id="modal"
        onClick={(e) => e.stopPropagation()}
        className={`py-12 px-12 duration-300 bg-gradient-primary rounded-xl shadow-p-6 transition-all max-w-[800px] w-[100%] ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        
        <button
          className="duration-300 absolute top-2 right-2 p-1 rounded-lg text-blue-500 hover:text-blue-500/50"
          onClick={onClose}
        >
          <IoMdClose size={32}/>
        </button>

        <h1 id="no-trailer" className="text-3xl font-bold text-center text-white">
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
