import "../../../styles/app/network.css";

import { useState } from "react";
import { BiPlus, BiSearchAlt } from "react-icons/bi";

function BlockchainNetworks() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container fadeInMe relative h-full mx-auto max-w-md p-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Network.."
          className="w-full px-4 py-2 border border-gray-800 outline-none focus:border-transparent rounded-lg bg-black/70 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <BiSearchAlt className="text-gray-400" size={21} />
        </div>
      </div>
      <div className="mt-4 overflow-y-auto max-h-48"></div>

      {/** bottom right */}
      <div className="absolute bottom-0 right-0 z-10 m-4 space-x-2 flex flex-row">
        <div
          className="animAddButton flex items-center align-center justify-center group rounded-lg bg-blue-500 p-2"
          role="button"
        >
          <BiPlus size={22} className="group-hover:mr-2" />
          <p className="hidden group-hover:inline-block text-xs">Add Network</p>
        </div>
      </div>
    </div>
  );
}

export default BlockchainNetworks;
