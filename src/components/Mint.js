import React, { useState, useEffect } from "react";
import "../styles/Mint.css";
import { ethers } from "ethers";
import { FractionNFTABI } from "../abis/FractionNFTABI";
import { web3Modal } from "../App";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTRegistryABI } from "../abis/NFTRegistryABI";
import { NFTRegistryAddress } from "../utils/utils";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const Mint = () => {
  const [minttype, setMintype] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const contractaddress = "";
  var NFTRegistry;
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      NFTRegistry = new ethers.Contract(
        NFTRegistryAddress,
        NFTRegistryABI,
        library.getSigner()
      );
    }
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function mint() {
    if (!name || !description || !fileUrl) return;
    console.log("mint with custom");
    console.log(name + " was created");
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const tx = await NFTRegistry.setName(name, url, {
        value: ethers.utils.parseEther("0.3"),
      });
      await tx.wait();
      console.log("mint with normal");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function mintdefault() {
    if (!name) return;
    const tx = await NFTRegistry.setName(name, "", {
      value: ethers.utils.parseEther("0.3"),
    });
    await tx.wait;
    console.log("mint with defualt");
  }
  function Minttype(type) {
    if (minttype === type) {
      setMintype("3");
      console.log(minttype);
    }
    setMintype(type);
  }
  return (
    <div>
      <div
        className="wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="pageboxmint1">
          <h2> Mint Fraction NFT </h2>
          <div style={{ display: "flex" }}>
            <button
              id="mintype1"
              onClick={() => {
                Minttype("1");
              }}
              className="buttonstandardchoose"
            >
              Customise
            </button>
            <div style={{ fontSize: "30px" }}>/</div>
            <button
              id="mintype2"
              onClick={() => {
                Minttype("2");
              }}
              className="buttonstandardchoose"
            >
              Defualt
            </button>
          </div>
          <div>
            {minttype === "1" ? (
              <>
                <div>
                  <div className="accountDetails">
                    <br />
                    <h5>Name</h5>
                    <input
                      type="text"
                      className="inputFaucet"
                      placeholder="NFT man"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <h5>Description</h5>
                    <textarea
                      style={{
                        maxWidth: "375px",
                        minWidth: "374px",
                        minHeight: "30px",
                      }}
                      type="text"
                      className="inputFaucet"
                      placeholder="An nft to showcase my fraction"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <h5>Image</h5>
                    <img alt="" width="400" height="320" src={fileUrl} />

                    <label htmlFor="upload-photo">Browse...</label>
                    <br />
                    <input type="file" id="upload-photo" onChange={onChange} />
                    <br />
                  </div>
                </div>
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={() => {
                      mint();
                    }}
                    className="buttonstandard"
                  >
                    Mint
                  </button>
                </div>
              </>
            ) : null}
            {minttype === "2" ? (
              <>
                <br />

                <div>
                  <p className="error"> </p>

                  <div
                    style={{ fontWeight: "bold" }}
                    className="accountDetails"
                  >
                    <h5>Name</h5>
                    <input
                      type="text"
                      className="inputFaucet"
                      placeholder="NFT man"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <br />- Mint with defualt settings -
                  </div>
                </div>
                <br />
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={() => {
                      mintdefault();
                    }}
                    className="buttonstandard"
                  >
                    Mint
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
