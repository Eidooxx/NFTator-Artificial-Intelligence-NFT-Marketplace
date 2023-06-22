// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTatorNFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    // the count of nft that created
    Counters.Counter private tokenid;
    // The count of items that sold out
    Counters.Counter private itemsold;
    address payable owner;
    mapping(uint256 => MarketItem) public MarketItems;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }


    constructor() ERC721("NFTator NFTs", "NFN") {
      owner = payable(msg.sender);
    }


    // Function to create nft token 
    function CreateToken(string memory _tokenURI, uint256 _Nftprice) public returns (uint) {
      tokenid.increment();
      uint256 CurrenNftTokenId = tokenid.current();

      _mint(msg.sender, CurrenNftTokenId);
      _setTokenURI(CurrenNftTokenId, _tokenURI);
      CreateNFTMarketItem(CurrenNftTokenId, _Nftprice);
      return CurrenNftTokenId;
    }
    // Function to list the nft on the marketplace
    function CreateNFTMarketItem(uint256 _tokenId,uint256 _Nftprice) private {

      require(_Nftprice > 0, "You have to provide nft price");
      MarketItems[_tokenId] =  MarketItem(
        _tokenId,
        payable(msg.sender),
        payable(address(this)),
        _Nftprice,
        false
      );
        // Send the nft token from msg.sender to this contract
      _transfer(msg.sender, address(this), _tokenId);

    }
    
    // Function to allow user that purchased an nft to relist again
    function ReListNft(uint256 _tokenId, uint256 _Nftprice) public  {
      require(MarketItems[_tokenId].owner == msg.sender, "Only item owner can perform this operation");
      MarketItems[_tokenId].sold = false;
      MarketItems[_tokenId].price = _Nftprice;
      MarketItems[_tokenId].seller = payable(msg.sender);
      MarketItems[_tokenId].owner = payable(address(this));
      itemsold.decrement();

      _transfer(msg.sender, address(this), _tokenId);
    }


    // Function to buy nft item
    function BuyNftItem(uint256 _tokenId) public payable {
      uint NftPrice = MarketItems[_tokenId].price;
      address seller = MarketItems[_tokenId].seller;

      require(msg.value == NftPrice, "Please pay what seller required");
      MarketItems[_tokenId].owner = payable(msg.sender);
      MarketItems[_tokenId].sold = true;
      MarketItems[_tokenId].seller = payable(address(0));
      itemsold.increment();
      _transfer(address(this), msg.sender, _tokenId);
      // Send the price to nft's seller
      payable(seller).transfer(msg.value);
    }

    // Function to return all the unsold nfts
    function FetchUnsoldNftsItems() public view returns (MarketItem[] memory) {
      uint itemscount = tokenid.current();
      uint unsoldItemCount = tokenid.current() - itemsold.current();
      uint CurrentIndex = 0;

      MarketItem[] memory UsoldNftitems = new MarketItem[](unsoldItemCount);

      for (uint i = 0; i < itemscount; i++) {
        if (MarketItems[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = MarketItems[currentId];
          UsoldNftitems[CurrentIndex] = currentItem;
          CurrentIndex += 1;
        }
      }
      return UsoldNftitems;
    }


    // Function to return the nfts that a specific user purchased
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = tokenid.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (MarketItems[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory MyNftItems = new MarketItem[](itemCount);

      for (uint i = 0; i < totalItemCount; i++) {
        if (MarketItems[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = MarketItems[currentId];
          MyNftItems[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return MyNftItems;
    }
}