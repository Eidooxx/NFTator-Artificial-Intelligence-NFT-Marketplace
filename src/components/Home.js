import { Flex ,Button,Image,Box,Text, Center, Link, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ImageOne from "./images/Imageone.jpg";
import ImageTwo from "./images/ImageTwo.jpg";
import ImageThree from "./images/ImageThree.jpg";
import ImageFour from "./images/ImageFour.jpg";

import Icon1 from "./images/icon1.png";
import Icon2 from "./images/icon2.png";
import Icon3 from "./images/icon3.png";
import Twitterlogo from "./images/twitterlogo.png";
import Linkedinlogo from "./images/linkedinlogo.png";
import Githublogo from "./images/githublogo.png";
import Hashnodelogo from "./images/hashnodelogo.png";


import { useMediaQuery } from 'react-responsive'


function Home () {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const navigate= useNavigate();

    return (
        <Flex  flexDirection="column">
            <Flex flexDirection="column"  bgGradient='linear(to-r, gray.900,gray.700,gray.900)'  height={["95vh","95vh","90vh","95vh"]}  justifyContent="center" alignItems="center">
                <Box>
                    <Center>
                        <Text fontSize={["20","20","54","58"]}  fontWeight="bold" fontFamily="Arial" color="white"  >
                            Create NFTs with AI and Sell 
                        </Text>
                    </Center>
                    <Center>
                        <Text fontSize={["20","20","54","58"]}  fontWeight="bold"   fontFamily="Arial" color="white">
                            them on NFTator
                        </Text>
                    </Center>
                    { isDesktopOrLaptop ?       
                        <Center>
                            <Text fontSize={["10","10","17","20"]}  fontWeight="bold" fontFamily="cursive" color="white">
                                The easiest way to generate your own NFT images with artificial intelligence and sell them.
                            </Text>
                        </Center> 
                        : 
                        <Center flexDirection="column">
                        <Text fontSize={["11","10","17","20"]}  fontWeight="bold"  fontFamily="cursive" color="white" >
                            The easiest way to generate your own NFT 
                        </Text>
                        <Text fontSize={["11","10","17","20"]}  fontWeight="bold" fontFamily="cursive" color="white">
                            images with artificial intelligence and sell them.
                        </Text>
                        
                    </Center> }
              
                </Box>

                
                
                <Flex height="30px"></Flex>
                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                    <Button fontSize={["18","18","22","22"]} 
                    bgColor="cyan.800"
                    color="white"
                    fontFamily="cursive"
                    height={isDesktopOrLaptop ? "70px" : "40px" }
                    width={isDesktopOrLaptop ? "200px" : "" } 
                
                    _hover={{
                        color:"black",
                        backgroundColor:"teal.500"
                    }}
                    borderRadius="50px"
                    onClick={()=> navigate("/create")}> 
                        Start Creating 
                    </Button>

                </Flex>
            </Flex>

           <br></br><br></br>
            <Flex flexDirection="column"  bgColor="white"   justifyContent="center" alignItems="center" >
                
                <Center>
                    <Text fontSize={["25","25","48","48"]} fontWeight="bold" fontFamily="Verdana" color="#1A365D" flexWrap="wrap" justifyContent="center" alignItems="center" >NFT AI Recent Creations</Text>
                </Center>
                <br></br><br></br>
                <Flex flexDirection={["column","column","row","row"]} justifyContent="space-evenly" alignItems="center" flexWrap="wrap" gap={["6","6","5","5"]}>
                    <Image src={ImageOne} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["70%","50%","22%","22%"]}  />
                    <Image src={ImageTwo} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["70%","50%","22%","22%"]}/>
                    <Image src={ImageThree} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["70%","50%","22%","22%"]}/>
                    <Image src={ImageFour} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["70%","50%","22%","22%"]}/>
                </Flex>
            </Flex>
            <br></br><br></br><br></br>
            <Flex flexDirection="column"  bgColor="white" justifyContent="center" alignItems="center">
                <Center>
                    <Text fontSize={["20","20","40","40"]} fontWeight="bold" fontFamily="Verdana" color="#1A365D" justifyContent="center" alignItems="center"  flexWrap="wrap">How to Create and List NFT Art</Text>
                </Center>
                <Center>
                    <Text fontSize={["20","20","40","40"]} fontWeight="bold" fontFamily="Verdana" color="#1A365D" justifyContent="center" alignItems="center" flexWrap="wrap">with NFTator</Text>
                </Center>
            </Flex>
            <br></br>
            <Flex flexDirection={["column","column","row","row"]} justifyContent="center" alignItems="center" >
                <Flex flexDirection= "row"  justifyContent="center" alignItems="center" flexWrap="wrap" bgColor="gray.200" gap={isDesktopOrLaptop ? "" : "6"} p ={7} width={isDesktopOrLaptop ? "" : "93%"} height={isDesktopOrLaptop ? "400" : ""} >
                
                    <Flex flexDirection="column" >
                        <Flex justifyContent="center" alignItems="center" flexDirection="column"> 
                            <Image src={Icon1} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["15%","15%","10%","10%"]}/>
                            <br></br>
                            <Text fontSize={["17","17","18","18"]} fontWeight="bold" fontFamily="cursive" color="black">
                                Creation
                            </Text>
                            <Box p={5} fontSize={18} fontFamily="cursive">
                                <Text>
                                    NFTator users can create NFTs using AI   
                                </Text>
                                <Text>
                                    by providing the description of an art image 
                                </Text>
                                <Text>
                                    Then it will generated by Hugging Face.
                                </Text>
                            </Box>
                            
                        </Flex>
                    
                    </Flex>
                    <Flex flexDirection="column">
                        <Flex justifyContent="center" alignItems="center" flexDirection="column"> 
                            <Image src={Icon2} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["15%","15%","10%","10%"]}/>
                            <br></br>
                            <Text fontSize={["17","17","18","18"]} fontWeight="bold" fontFamily="cursive" color="black">
                                Minting
                            </Text>
                            <Box p={5} fontSize={18} fontFamily="cursive">
                                <Text>
                                    Users can also upload their own art images
                                </Text>
                                <Text>
                                    Then they will mint an NFT from NFT creation 
                                </Text>
                                <Text>
                                    contract with ERC-721 standards.
                                </Text>
                            </Box>
                        </Flex>
                
                    </Flex>
                    <Flex flexDirection="column">
                        <Flex justifyContent="center" alignItems="center" flexDirection="column"> 
                            <Image src={Icon3} _hover={{transform:" perspective(400px) translateZ(40px)"}} w={["15%","15%","10%","10%"]}/>
                            <br></br>
                            <Text fontSize={["17","17","18","18"]} fontWeight="bold" fontFamily="cursive" color="black">
                                Listing
                            </Text>
                            <Box p={5} fontSize={18} fontFamily="cursive">
                                <Text>
                                    Users can list their NFTs with 0% fees
                                </Text>
                                <Text>
                                    The price of their NFTs will be in ETH as  
                                </Text>
                                <Text>
                                    NFTator is deployed on Sepolia testnet.
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>

                </Flex>


            </Flex>
            <br></br><br></br><br></br>
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                    <Flex flexDirection="row" gap={["5","5","7","7"]} justifyContent="center" alignItems="center" height={10}>
                        <Link href="https://twitter.com/Eidooxx" w={["12%","12%","10%","10%"]}  _hover={{transform:" perspective(500px) translateZ(50px)"}} isExternal="true"><Image src={Twitterlogo} href="www.google.com" /></Link>
                        <Link href="https://www.linkedin.com/in/eidooxx/" w={["12%","12%","10%","10%"]}  _hover={{transform:" perspective(500px) translateZ(50px)"}} isExternal="true"><Image src={Linkedinlogo} href="www.google.com" /></Link>
                        <Link href="https://github.com/eidooxx/" w={["12%","12%","10%","10%"]}  _hover={{transform:" perspective(500px) translateZ(50px)"}} isExternal="true"><Image src={Githublogo} href="www.google.com" /></Link>
                        <Link href="https://eidoox.hashnode.dev/" w={["12%","12%","10%","10%"]}  _hover={{transform:" perspective(500px) translateZ(50px)"}} isExternal="true"><Image src={Hashnodelogo} href="www.google.com" /></Link>

                    </Flex>
                    <Text fontSize={13} fontWeight="extrabold" fontFamily="Helvetica " color="#1A365D">
                        Made with &#10084; by: Ahmed Eid (Eidoox)
                    </Text>

                </Flex>

            </Flex>
            



 

    )

}
export default Home;