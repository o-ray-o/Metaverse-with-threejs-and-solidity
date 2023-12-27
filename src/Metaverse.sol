// SPDX-License-Indentifier: MIT
pragma solidity ^0.8.0;

// Openzeppelin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Address of contract 0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B

// Creation of Metaverse Smart Contract

contract Metaverse is ERC721, Ownable {
    // Constructor
    constructor() ERC721("PomodoroLand", "PMD") {}

    // Counters to regulate number of NFT
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // Total Number of NFT available for creation

    uint256 public maxSupply = 100;

    // Cost to be paid for each NFT Token
    uint256 public cost = 0.001 ether;

    // Owner and Its properties
    mapping(address => Building[]) NFTOwners;

    // metaverse buildings
    struct Building {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    // List of Buildings in Metaverse
    Building[] public buildings;

    // Obtaining buildings made in Metaverse
    function getBuildings() public view returns (Building[] memory) {
        return buildings;
    }

    // Current supply of NFT Tokens
    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    // Creation of the Buildings as NFT Token in the metaverse
    function mint(
        string memory _building_name,
        int8 _w,
        int8 _h,
        int8 _d,
        int8 _x,
        int8 _y,
        int8 _z
    ) public payable {
        require(supply.current() <= maxSupply, "Max Supply Exceeded!");
        require(msg.value >= cost, "Insufficient funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuild = Building(
            _building_name,
            _w,
            _h,
            _d,
            _x,
            _y,
            _z
        );
        buildings.push(_newBuild);
        NFTOwners[msg.sender].push(_newBuild);
    }

    // Extraction of ethers from Smart Contract to the Owner
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Obtain of user's metaverse Buildings
    function getOwnerBuildings() public view returns (Building[] memory) {
        return NFTOwners[msg.sender];
    }
}
