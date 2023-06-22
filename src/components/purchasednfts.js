import { Flex ,Box,Image,Text, Center, Spinner,Input,FormControl,FormLabel,Button,useToast,useDisclosure} from "@chakra-ui/react";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton} from '@chakra-ui/react'
import { ethers } from "ethers";
import { useEffect, useState } from "react";


function PURCHASEDNFTS ({account,nftmarketplacecontractabi}) {

    const [myfetchednft, setmyfetchednfts] = useState([]);
    const [nftprice , setnftprice] = useState("");
    const [nfttoken , setnfttoken] = useState("");

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()


    const getmynfts = async () =>{
        try {
            let mynfts = [];
            const fetechmynfts = await nftmarketplacecontractabi.fetchMyNFTs();
            const fetechmynftslength = fetechmynfts.length;
            for (let i = 0 ; i< fetechmynftslength ; i++){
                let currentfetchednft = fetechmynfts[i];
                let currenttokenidnft = currentfetchednft.tokenId;
                let currentmetadatalink = await nftmarketplacecontractabi.tokenURI(Number(currenttokenidnft));
                const responsefrom_metadata = await fetch(currentmetadatalink);
                const metadata = await responsefrom_metadata.json();                
                const imageurl = metadata.image;
                const ipfsimageurl = imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
                mynfts.push({
                    nftname: metadata.name, 
                    nftdescription: metadata.description,
                    nftimage: ipfsimageurl,
                    nfttokenid: Number(currentfetchednft.tokenId),
                    nftseller:currentfetchednft.seller,
                    nftowner:currentfetchednft.owner,
                    nftprice: (Number(currentfetchednft.price))/10**18,
                    nftissold:currentfetchednft.sold
                });

                console.log(mynfts);
            }
            setmyfetchednfts(mynfts);
            
        }
        catch (error){
            console.log(error);
        }   
    }

    const relistnfts = async (_tokenid,_nftprice) =>{
        try{
            const etherprice = converpricetoether(_nftprice);
            const tx = await nftmarketplacecontractabi.ReListNft(_tokenid,etherprice);
            if (tx.hash || tx.transactionHash){
                toast({
                    title: "Success",
                    description: "NFT is Listed on NFTator successfully.",
                    status: 'success',
                    duration: 2800,
                    isClosable: true,
                    position: 'top-left',   
                });
      
            }
            getmynfts();

        }
        catch (error){
            console.log(error);
        }

    }

    const converpricetoether = (_nftprice) => {
        const priceinether = ethers.utils.parseEther(_nftprice.toString());
        return priceinether;
    }

    useEffect( ()=>{
        getmynfts();
    },[])
   



    return (
        <>  
        
        {
                account ? (

                    
                <>
            {
                myfetchednft.length > 0 ? (
                    <Flex   alignItems="center" flexDirection= {["column","column","row","row"]} flexWrap="wrap" p={10} gap={["10","10","20","20"]} ml={["","","10px","10px"]}>
                    { myfetchednft.map((nft,idx) => (
         
                            <Box w={["100%","100%","15%","15%"]} h={[,,"53vh","49vh"]} border='2px' borderColor='grey.300'borderRadius="15px"  key={idx} p={3}>
                                <Image src={nft.nftimage} w="100%" h="50%"></Image>
                                <br></br>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={18} height="6%" w="100%" flexWrap="wrap" flex> {nft.nftname}</Flex>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={16} height="11%" w="100%" flexWrap="wrap" > {nft.nftdescription}</Flex>
                                <Flex fontWeight="bold" fontFamily="cursive" fontSize={16}> Owner: {nft.nftowner.slice(0, 6) + '...' + nft.nftowner.slice(38, 42)}</Flex>
                                <br></br>
                                <Flex justifyContent="center" alignItems="center">
                                    <Button h="45px" w="45%" fontSize="20px" fontWeight="bold" colorScheme="blue" _hover={{background: "#702459",}} borderRadius="30px" onClick={()=>{setnfttoken(nft.nfttokenid); onOpen();}}> List</Button>
                                </Flex>

                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                    <ModalHeader fontWeight="bold">List Your NFT</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>

                                        <form>
                                            <FormControl >
                                                <FormLabel fontSize={17} fontWeight="bold">Price</FormLabel>
                                                <Input fontWeight="bold" placeholder="NFT price in ETH .." type="number"  value={nftprice} onChange={(e)=>{setnftprice(e.target.value)}}/>
                                            </FormControl>
                                        </form>
                                        <br></br>
                                        <Flex justifyContent="center" alignItems="center">
                                            <Button h="48px" w="45%" fontSize="20px" fontWeight="bold" colorScheme="blue" _hover={{background: "#702459",}} borderRadius="30px" onClick={()=>{relistnfts(nfttoken,nftprice)}}> List</Button>
                                        </Flex>
                                    </ModalBody>
                        
                                    
                                    </ModalContent>
                                </Modal>

                            </Box>
                         

                    ))}
                    </Flex>
             
        
                ): 
                (
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" fontWeight="bold">
                        <br></br> <br></br>
                        
                            <Text   fontSize={["20px","20px","30px","30px"]} fontFamily="cursive">
                                Loading Your Purchased NFTs..
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
                : (
                    <Flex justifyContent="center" alignItems="center"  p={10}>
                        <Center>
                            <Text   fontSize={30} fontFamily="cursive" fontWeight="bold">
                                Connect MetaMask wallet to show your purchased NFTs.
                            </Text>
                        </Center>

                    </Flex>
                )
            }
    
            
            
        </>

    )

}
export default PURCHASEDNFTS;