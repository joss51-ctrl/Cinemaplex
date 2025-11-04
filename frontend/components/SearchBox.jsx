function SearchBox(props) {
  return (
    <input
      className=" text-sm text-yellow border-none bg-blue-950 shadow-black outline-none rounded-lg px-5 py-2 max-w-[250px] w-[100%] font-sans md:max-w-[100%]"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
  );
}

export default SearchBox;
