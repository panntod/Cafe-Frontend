
const SearchInput = ({ search, setSearch }) => {
    return (
      <input
        type="search"
        name="Search"
        placeholder="Search..."
        className="w-56 py-2 pl-4 text-sm outline-none bg-white text-gray-700 rounded-lg shadow border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  };
  

export default SearchInput;
