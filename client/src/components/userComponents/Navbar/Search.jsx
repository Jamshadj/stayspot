import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Search() {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setSearchText('');
  };

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleSearchClick}
    >
      {showInput ? (
        <div className="flex flex-row items-center justify-between">
          <input
            type="text"
            className="w-full px-4 py-1 text-sm outline-none"
            placeholder="Search"
            value={searchText}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">Anywhere</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            Anywheek
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guest</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
