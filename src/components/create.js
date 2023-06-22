import { Flex ,Button,Box,Input,Text,FormControl,FormLabel, Center,useToast} from "@chakra-ui/react";
import { NFTStorage } from 'nft.storage'
import { ethers } from "ethers";
import { useState } from "react";


function Create ({account,nftmarketplacecontractabi}) {
    const [buttontext , setbuttontext] = useState("Create");
    const [nftname , setnftname] = useState("");
    const [nftdescription , setnftdescription] = useState("");
    const [nftprice , setnftprice] = useState("");
    const [nftimage , setnftimage] = useState();


    console.log("create" , nftmarketplacecontractabi);

    const toast = useToast();

    // NFT.Storage API Key
    const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEExMGM3NjVEMjBjNjBiNWViMDg1N0UzMDM5NzdDQzhBRUVhQzg2MGEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NzEzNzk3OTQ5MCwibmFtZSI6Ik5GVGF0b3IifQ.hNROtWx9_ukZFPF3AvTefYf_lEPVTAasTxd2gb5tR70";
 
    
    // handlesubmitintform function
    const handlesubmitintform = async (e)=>{
   
      e.preventDefault();
      if (!nftname || !nftdescription || !nftprice || !nftimage){
        e.preventDefault();
        toast({
          title: 'Fields required.',
          description: "Error! fill all input data.",
          position: "top-left",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
  
      }
      else {
        e.preventDefault();
        try{
        const ipfsimagelink = await uploadnftimagetoipfs (nftimage,nftname,nftdescription);
        const priceinether = ethers.utils.parseEther(nftprice.toString());
        if (account){
          await createandmintnft(ipfsimagelink,priceinether);
        }

        else{
          toast({
            title: 'Wallet Connection Error',
            description: "Connect MetaMask Wallet to Mint NFTs.",
            position: "top-left",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
        }
      }
      catch(error){
        console.log(error);
      }
        setbuttontext("Create")
         
      }
    }
    
    const createandmintnft = async (tokenuri,nftprice) => {
      setbuttontext("Minting NFT..");
      const tx = await (await nftmarketplacecontractabi.CreateToken(tokenuri,nftprice)).wait();
      if (tx.hash || tx.transactionHash){
          toast({
              title: "Success",
              description: "NFT is created and listed successfully",
              status: 'success',
              duration: 2800,
              isClosable: true,
              position: 'top-left',   
          });

      }

    }

    const uploadnftimagetoipfs = async (image,name,description) => {
      setbuttontext("Uploading Image to IPFS..");
      const client = new NFTStorage({
          token: NFT_STORAGE_API_KEY
          });
    
      const metadata = await client.store({
              name: name,
              description: description,
              image: image,
                
          })
      const metadatalink = metadata.url;
      const metadataafteredit = metadatalink.replace("ipfs://","https://ipfs.io/ipfs/");
     
      if (metadataafteredit){
        toast({
          title: 'Success',
          description: "Image uploaded to IPFS successfully.",
          position: "top-left",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
        return metadataafteredit;
    }





    return (
        <Flex  justifyContent="center" alignItems="center" flexDirection="column" mt={["40%","40%","8%","8%"]}  >
    
      
            <Center>
                <Text fontSize={["23","23","30","30"]} fontWeight="bold">Create and Mint NFTs</Text>
            </Center>
 
            <br></br>
            <form onSubmit={handlesubmitintform}>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Name</FormLabel>
                <Input fontWeight="bold" placeholder="NFT name .." maxLength={20} value={nftname} onChange={(e)=>{setnftname(e.target.value)}}/>
              </FormControl>
              <br></br>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Description</FormLabel>
                <Input fontWeight="bold" placeholder="NFT description .." maxLength={38} value={nftdescription} onChange={(e)=>{setnftdescription(e.target.value)}}/>
              </FormControl>
              <br></br>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Price</FormLabel>
                <Input fontWeight="bold" placeholder="NFT price in ETH .." type="number"  value={nftprice} onChange={(e)=>{setnftprice(e.target.value)}}/>
              </FormControl>
              <br></br>
              <FormControl>
                <FormLabel fontSize={17} fontWeight="bold">NFT Image</FormLabel>
                <Input type="file" onChange={(e)=>{setnftimage(e.target.files[0])}} />
              </FormControl>
              <br></br>
              <Button width="full"  type="submit" fontSize={20} fontWeight="bold" h={45} >
                {buttontext}
              </Button>
            </form>
      
      </Flex>

    )

}
export default Create;