// Talk is cheap, send patches.

import React, { useEffect, useState } from "react";
import {
  BiSearchAlt,
  BiPlus,
  BiMinus,
  BiEdit,
  BiUpload,
  BiImageAdd,
} from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { getLocalStorage, setLocalStorage } from "../../../utils/storage";

interface Network {
  ticker: string;
  name: string;
  logo: string | null;
  rpc: string;
  ws: string;
  enabled: boolean;
}

export default function Network() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [knownNetworks, setKnownNetworks] = useState<Network[]>([]);
  const [newNetwork, setNewNetwork] = useState<Network>({
    ticker: "",
    name: "",
    logo: null,
    rpc: "",
    ws: "",
    enabled: false,
  });

  const [showAddNetwork, setShowAddNetwork] = useState<boolean>(false);

  const [editedNetwork, setEditedNetwork] = useState<Network | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedTicker, setEditedTicker] = useState<string>("");
  const [editedLogo, setEditedLogo] = useState<string | null>(null);
  const [editedRPC, setEditedRPC] = useState<string>("");
  const [editedWS, setEditedWS] = useState<string>("");

  useEffect(() => {
    (async () => {
      const storedNetworks = await getLocalStorage("knownNetworks");
      if (storedNetworks) {
        setKnownNetworks(JSON.parse(storedNetworks));
      }
    })();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddNetwork = () => {
    setShowAddNetwork(true);
  };

  const handleGoBack = () => {
    setShowAddNetwork(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          setNewNetwork({ ...newNetwork, logo: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };  

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNetwork({ ...newNetwork, name: event.target.value });
  };

  const handleTickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNetwork({ ...newNetwork, ticker: event.target.value });
  };

  const handleRPCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNetwork({ ...newNetwork, rpc: event.target.value });
  };

  const handleWSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNetwork({ ...newNetwork, ws: event.target.value });
  };

  const handleAddNetworkX = () => {
    if (
      newNetwork.name &&
      newNetwork.ticker &&
      newNetwork.rpc &&
      newNetwork.ws
    ) {
      const updatedNetworks = [...knownNetworks, newNetwork];
      setKnownNetworks(updatedNetworks);
      setLocalStorage("knownNetworks", JSON.stringify(updatedNetworks));
      setShowAddNetwork(false);
      setNewNetwork({
        ticker: "",
        name: "",
        logo: null,
        rpc: "",
        ws: "",
        enabled: false,
      });
    }
  };

  const handleEditNetwork = (network: Network) => {
    setEditedNetwork(network);
    setEditedName(network.name);
    setEditedTicker(network.ticker);
    setEditedLogo(network.logo);
    setEditedRPC(network.rpc);
    setEditedWS(network.ws);
  };

  const handleSaveChanges = () => {
    if (editedNetwork) {
      const updatedNetworks = knownNetworks.map((network) =>
        network.ticker === editedNetwork.ticker ? {
          ...network,
          name: editedName,
          ticker: editedTicker,
          logo: editedLogo,
          rpc: editedRPC,
          ws: editedWS
        } : network
      );
      setKnownNetworks(updatedNetworks);
      setLocalStorage("knownNetworks", JSON.stringify(updatedNetworks));
      setEditedNetwork(null);
    }
  };

  const handleDiscardChanges = () => {
    setEditedNetwork(null);
    setEditedName("");
    setEditedTicker("");
    setEditedLogo(null);
    setEditedRPC("");
    setEditedWS("");
  };

  const toggleNetwork = (network: Network) => {
    if (network.name === "Nano" && network.ticker.toLowerCase() == "xno") return; // Nano network should always be enabled
    const updatedNetworks = knownNetworks.map((n) =>
      n.ticker === network.ticker ? { ...n, enabled: !n.enabled } : n
    );
    setKnownNetworks(updatedNetworks);
    setLocalStorage("knownNetworks", JSON.stringify(updatedNetworks));
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

      <div className="relative overflow-y-auto bg-gradient-to-r from-slate-800 to-gray-800 p-2 mt-3 rounded-md h-[400px] overflow-y-scroll overflow-x-hidden">
        {knownNetworks
          .filter(
            (network) =>
              network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              network.ticker.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((network, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-900 rounded-md p-2 mb-2 relative"
            >
              <img
                src={network.logo || "img/crypto/unknown.svg"}
                alt={network.name}
                className="h-8 rounded-full aspect-square"
              />
              <div>
                <p className="font-semibold">{network.name}</p>
                <p className="text-xs text-gray-500">{network.ticker}</p>
              </div>
              <div className="flex-grow" />
              <button className="text-xs text-blue-500 hover:text-blue-300">
                <BiEdit size={18} />
              </button>
            </div>
          ))}
        {knownNetworks.filter(
          (network) =>
            network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            network.ticker.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="flex flex-col space-y-2 items-center h-full justify-center text-slate-200">
            <img
              src="img/SadBlob.svg"
              className="select-none h-32 pointer-events-none w-auto"
              draggable={false}
            />
            <p className="text-lg">No such network found!</p>
            <span className="text-xs text-sky-400 align-center text-center">
              "{searchTerm}" not found. are you sure it exists?
            </span>
          </div>
        )}
      </div>

      {showAddNetwork && (
        <div
          style={{ background: "rgb(16, 16, 20)" }}
          className="absolute z-50 top-0 left-0 h-full w-full p-4 rounded-t-lg transition-all transform translate-y-0"
        >
          <button
            className="text-slate-300 hover:text-slate-200 transition-colors absolute top-2 left-2"
            onClick={handleGoBack}
          >
            <IoArrowBack size={24} />
          </button>
          <div className="flex flex-col space-y-4 mt-4 pb-5">
            {/** preview */}
            <div className="flex flex-row align-center rounded-full bg-transparent justify-center">
              {newNetwork.logo ? (
                <img src={newNetwork.logo} className="h-48 w-auto" />
              ) : (
                <BiImageAdd className="h-48 w-auto" />
              )}
            </div>
            <label
              htmlFor="logoFile"
              role="button"
              onClick={() => document.getElementById("logoFile")?.click()}
            >
              <div className="bg-slate-700 hover:bg-slate-600 transition-colors flex flex-row justify-center p-2 align-center rounded-full">
                <BiUpload size={24} />
                <span>&nbsp;Upload Image</span>
              </div>
            </label>
            <input
              type="file"
              id="logoFile"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-gray-800 text-white p-2 rounded-full hidden"
            />
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                placeholder="Name"
                onInput={handleNameChange}
                autoComplete="false"
                autoCorrect="false"
                aria-autocomplete="none"
                className="w-2/3 px-4 py-2 border border-gray-800 outline-none focus:border-transparent rounded-lg bg-black/70 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                autoComplete="false"
                onInput={handleTickerChange}
                autoCorrect="false"
                aria-autocomplete="none"
                placeholder="Ticker"
                className="w-1/3 px-4 py-2 border border-gray-800 outline-none focus:border-transparent rounded-lg bg-black/70 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <input
              type="text"
              placeholder="RPC URL"
              onInput={handleRPCChange}
              autoComplete="false"
              autoCorrect="false"
              aria-autocomplete="none"
              className="w-full px-4 py-2 border border-gray-800 outline-none focus:border-transparent rounded-lg bg-black/70 focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              placeholder="WS URL"
              onInput={handleWSChange}
              autoComplete="false"
              autoCorrect="false"
              aria-autocomplete="none"
              className="w-full px-4 py-2 border border-gray-800 outline-none focus:border-transparent rounded-lg bg-black/70 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleAddNetworkX}
              className="btn bg-blue-500 p-2 rounded-md hover:bg-blue-400 transition-colors text-white"
            >
              Add Network
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 right-0 z-10 m-4 space-x-2 flex flex-row">
        <div
          className="animAddButton drop-shadow-2xl flex items-center align-center justify-center group rounded-lg bg-blue-500 p-2"
          role="button"
          onClick={handleAddNetwork}
        >
          <BiPlus size={22} className="group-hover:mr-2" />
          <p className="hidden group-hover:inline-block text-xs">Add Network</p>
        </div>
      </div>
    </div>
  );
}