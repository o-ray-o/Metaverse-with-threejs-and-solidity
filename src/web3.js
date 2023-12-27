import abi from "./abi/abi.json" assert { type: "json" };

// SC: 0x06e79Ba63efB8b325321ff6E3a08AD3a488C3213

const blockchain = new Promise((res, rej) => {
  // If Metamask is not available
  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask to use it!");
  }

  // Web3 Instance
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x06e79Ba63efB8b325321ff6E3a08AD3a488C3213"
  );

  //   Get my metamask address
  web3.eth.requestAccounts().then((accounts) => {
    console.log("-> My Account is:", accounts[0]);
  });
  // Get Current supply of NFTs
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        console.log("->Current supply of NFT is: ", Number(supply));
      });
  });

  // Get Maximum supply of NFTs
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .maxSupply()
      .call({ from: accounts[0] })
      .then((maxsupply) => {
        console.log("->Maximum supply of NFT is:", Number(maxsupply));
      });
  });

  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .getOwnerBuildings()
      .call({ from: accounts[0] })
      .then((buildings) => {
        console.log("-> Your Buildings", buildings);
      });
  });

  // Get buildings made in Metaverse
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        contract.methods
          .getBuildings()
          .call({ from: accounts[0] })
          .then((data) => {
            res({ supply: supply, building: data });
          });
      });
  });
});

export default blockchain;
