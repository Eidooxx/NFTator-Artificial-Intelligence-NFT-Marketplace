import { Flex ,Box,Image,Text, Center, Spinner, Button,useToast} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";


function EXPLORE ({account,nftmarketplacecontractabi}) {

    const [listednfts, setlistednfts] = useState([]);

    const toast = useToast();


    const getunsoldnfts = async () =>{
        try {
            let listedunsoldnfts = [];
            const unsoldnfts = await nftmarketplacecontractabi.FetchUnsoldNftsItems();
            const unsoldnftslength = unsoldnfts.length;
            for (let i = 0 ; i< unsoldnftslength ; i++){
                let currentunsoldnft = unsoldnfts[i];
                let currenttokenidnft = currentunsoldnft.tokenId;
                let currentmetadatalink = await nftmarketplacecontractabi.tokenURI(Number(currenttokenidnft));
                const responsefrom_metadata = await fetch(currentmetadatalink);
                const metadata = await responsefrom_metadata.json();                
                const imageurl = metadata.image;
                const ipfsimageurl = imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
                listedunsoldnfts.push({
                    nftname: metadata.name, 
                    nftdescription: metadata.description,
                    nftimage: ipfsimageurl,
                    nfttokenid: Number(currentunsoldnft.tokenId),
                    nftseller:currentunsoldnft.seller,
                    nftowner:currentunsoldnft.owner,
                    nftprice: (Number(currentunsoldnft.price))/10**18,
                    nftissold:currentunsoldnft.sold
                });

                console.log(listedunsoldnfts);
            }
            setlistednfts(listedunsoldnfts);
            
        }
        catch (error){
            console.log(error);
        }   
    }

    const buynft = async (_tokenid)=>{
        const nftprice = (await nftmarketplacecontractabi.MarketItems(_tokenid)).price;
        try{
            const buytx = await (await nftmarketplacecontractabi.BuyNftItem(_tokenid, { value: nftprice })).wait();
            if (buytx.hash || buytx.transactionHash){
                toast({
                    title: "Success",
                    description: "NFT is purchased successfully.",
                    status: 'success',
                    duration: 2800,
                    isClosable: true,
                    position: 'top-left',   
                });
    
            }
            getunsoldnfts();
        }
        catch(error){
            console.log(error);
        }

    }

    useEffect( ()=>{
         getunsoldnfts();
    },[])
   



    return (
        <>  

            {
                account ? (

                    
                <>
                {
                listednfts.length > 0 ? (
                    <Flex   alignItems="center" flexDirection= {["column","column","row","row"]} flexWrap="wrap" p={10} gap={["10","10","20","20"]} ml={["","","10px","15px"]}>
                    { listednfts.map((nft,idx) => (
         
                            <Box w={["100%","100%","15%","15%"]} h={[,,"53vh","53vh"]} border='2px' borderColor='grey.300'borderRadius="15px"  key={idx} p={3}>
                                <Image src={nft.nftimage} w="100%" h="50%"></Image>
                                <br></br>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={18} height="6%" w="100%" flexWrap="wrap" flex> {nft.nftname}</Flex>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={16} height="11%" w="100%" flexWrap="wrap" > {nft.nftdescription}</Flex>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={16}> Owner: {nft.nftseller.slice(0, 6) + '...' + nft.nftseller.slice(38, 42)}</Flex>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={16}> Price: {nft.nftprice} ETH</Flex>
                                <br></br>
                                <Flex justifyContent="center" alignItems="center">
                                    <Button h="45px" w="45%" fontSize="20px" fontWeight="bold" colorScheme="blue" _hover={{background: "#702459",}} borderRadius="30px" onClick={()=> {buynft(nft.nfttokenid)}}> Buy</Button>
                                </Flex>

                            </Box>
                       
                    ))}
                    </Flex>
             
        
                ): 
                (
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" fontWeight="bold">
                        <br></br> <br></br>
                        
                            <Text   fontSize={30} fontFamily="cursive">
                                Loading..
                            </Text>
                      
                        <br></br>
                        <Center>
                            <Spinner size= "xl" justifyContent="center" alignItems="center" />
                        </Center>

                    </Flex>
                )
            }
            </>
                 
                )
                :(
                    <Flex justifyContent="center" alignItems="center"  p={10}>
                        <Center>
                            <Text   fontSize={30} fontFamily="cursive" fontWeight="bold">
                                Connect MetaMask wallet to explore NFTs.
                            </Text>
                        </Center>

                    </Flex>
                
                )}
            
        </>

    )

}
export default EXPLORE;