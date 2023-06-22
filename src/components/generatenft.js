import { Flex ,Button,Image,Input,Text,FormControl,FormLabel, Center,useToast,useDisclosure, Spinner} from "@chakra-ui/react";
import axios from "axios";
import { NFTStorage , File} from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from "ethers";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton} from '@chakra-ui/react'
import { useState,useEffect } from "react";


function GENERATENFT ({account,nftmarketplacecontractabi}) {
    const [buttontext , setbuttontext] = useState("Generate");
    const [nftname , setnftname] = useState("");
    const [nftdescription , setnftdescription] = useState("");
    const [nftprice , setnftprice] = useState("");
    const [nftimage , setnftimage] = useState(null);

    const REACT_APP_HUGGING_FACE_API_KEY = "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";
    const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEExMGM3NjVEMjBjNjBiNWViMDg1N0UzMDM5NzdDQzhBRUVhQzg2MGEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NzEzNzk3OTQ5MCwibmFtZSI6Ik5GVGF0b3IifQ.hNROtWx9_ukZFPF3AvTefYf_lEPVTAasTxd2gb5tR70";

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log("generate" , nftmarketplacecontractabi);

    // handlesubmitintform function

    const handlesubmitintform = async (e)=>{
        e.preventDefault();
      if (!nftname || !nftdescription || !nftprice ){
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
        const nftimagedata = await generateainft(nftdescription);
        const nftimageurl = await uploadnftimagetoipfs(nftimagedata,nftname,nftdescription);
        const priceinether = ethers.utils.parseEther(nftprice.toString());
        if (account){
          await createandmintnft(nftimageurl,priceinether);
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
        console.log(error)
      }
        setbuttontext("Generate")
         
             
      }
    }

    const generateainft = async (_promptnftdescription) => {
        setbuttontext("Generating..");
        const URL =  `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;
        const response = await axios({
          url: URL,
          method: "POST",
          headers: {
            Authorization: `Bearer ${REACT_APP_HUGGING_FACE_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          data : JSON.stringify({
            inputs: _promptnftdescription ,  options: { wait_for_model: true },
          }),
          responseType: "arraybuffer",
        })
        const type = response.headers["content-type"];
        const data = response.data;
        console.log(data)

        const base64data = Buffer.from(data).toString('base64')
        const image = `data:${type};base64,` + base64data;
        if (image){
          toast({
            title: 'Ai Image generated successfully',
            description: "Click on preview to check the image.",
            position: "top-left",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
        setnftimage(image);
        return data;
    }

    const createandmintnft = async (tokenuri,nftprice) => {
      setbuttontext("Minting NFT..");
      const tx = await (await nftmarketplacecontractabi.CreateToken(tokenuri,nftprice)).wait();
      if (tx.hash || tx.transactionHash){
          toast({
              title: "Success",
              description: "NFT is generated and listed successfully",
              status: 'success',
              duration: 2800,
              isClosable: true,
              position: 'top-left',   
          });

      }
    }

    const uploadnftimagetoipfs = async (image,name,description) => {
      setbuttontext("Uploading..");
      const client = new NFTStorage({
          token: NFT_STORAGE_API_KEY
          });
  
      const metadata = await client.store({
              name: name,
              description: description,
              image: new File([image], `${name}.jpeg`, { type: "image/jpeg" }),
              
          })
      const metadatalink = metadata.url;
      const metadataafteredit = metadatalink.replace("ipfs://","https://ipfs.io/ipfs/");
      if (image){
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
        <Flex  justifyContent="center" alignItems="center" flexDirection="column" mt={["40%","40%","10%","10%"]}  >
            <Center>
                <Text fontSize={["23","23","30","30"]} fontWeight="bold">Generate and Mint NFTs</Text>
            </Center>
 
            <br></br>
            <form onSubmit={handlesubmitintform}>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Name</FormLabel>
                <Input fontWeight="bold" placeholder="NFT name .." maxLength={20} value={nftname} onChange={(e)=>{setnftname(e.target.value)}}/>
              </FormControl>
              <br></br>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Prompt</FormLabel>
                <Input fontWeight="bold" placeholder="NFT description .." maxLength={38}  value={nftdescription} onChange={(e)=>{setnftdescription(e.target.value)}}/>
              </FormControl>
              <br></br>
              <FormControl >
                <FormLabel fontSize={17} fontWeight="bold">Price</FormLabel>
                <Input fontWeight="bold" placeholder="NFT price in ETH .." type="number"  value={nftprice} onChange={(e)=>{setnftprice(e.target.value)}}/>
              </FormControl>
          
              <br></br>
              <Flex justifyContent="center" alignItems="center" flexDirection="row" gap={6}>
                <Button   type="submit" fontSize={20} fontWeight="bold" h={50} w={160} onClick={handlesubmitintform} >
                    {buttontext}
                </Button>
                
                <Button  fontSize={20} fontWeight="bold" h={50} w={160} onClick={onOpen} >
                    Preview
                </Button>
                </Flex>
            </form>


           
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontWeight="bold">{nftname}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  { nftimage ? <Image src={nftimage}/>
                    :
                    <Flex justifyContent="center" alignItems="center" flexDirection="column"> 
                      <Text fontSize={20} fontWeight="bold" >No image to preview.</Text>
                      <br></br>
                      <Spinner size="lg" />
                    </Flex>}
                </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>

              </ModalFooter>
              </ModalContent>
            </Modal>
      
      </Flex>

    )

}
export default GENERATENFT;