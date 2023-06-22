import { Flex ,Button,IconButton,useDisclosure, useToast, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from '@chakra-ui/icons'
import {Drawer,DrawerBody,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import {Menu,MenuButton,MenuList} from '@chakra-ui/react'
import { useState } from "react";
import { ethers } from "ethers";
import NftMarketPlaceABI from "../ContractABI/ContractABI.json";

function NAVBAR ({provider,signer,network,nftmarketplacecontractabi,setnftmarketplacecontract,account,setaccount}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const nftmarketplacecontractaddress= "0x2E3BEea91a5d4637bD0Ef2b6CE656A7e5fcBfabe";

    const ConnectWallet = async () => {
        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        });        
        setaccount(accounts[0]);
        connecttonftmarketplacecontract(signer)
    }

    
    window.ethereum.on('accountsChanged', async function (accounts) {          
        await ConnectWallet()
    })
    window.ethereum.on('networkChanged', async function(networkId){
      await ConnectWallet()
    })

    const connecttonftmarketplacecontract = async (signer) => {
        const nftmarketplace = new ethers.Contract(nftmarketplacecontractaddress,NftMarketPlaceABI.nftmarketplaceabi,signer);
        setnftmarketplacecontract(nftmarketplace);
    }


    return (
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" padding={3} bgGradient='linear(to-r, gray.600, gray.700)' >
            <Flex fontSize={33} fontWeight="bold" color="white">NFTator </Flex>
            <Flex flexDirection="row" gap={20} display={["none","none","flex","flex"]} >
                <Flex as={Link}  to="/" alignItems="center"  fontSize={20} fontWeight="bold" color="white" >Home</Flex>
                <Menu>
                    <MenuButton as={Flex} alignItems="center" fontSize={20} fontWeight="bold" color="white">
                    Create
                    </MenuButton>
                    <MenuList >
                        <Flex as={Link}  to="/generate" justifyContent="center" alignItems="center"  fontSize={20} fontWeight="bold" color="black" >Generate</Flex>
                        <Divider fontSize="10px" borderColor="grey"/>
                        <Flex as={Link}  to="/create" justifyContent="center" alignItems="center"  fontSize={20} fontWeight="bold" color="black" >Create</Flex>
                    </MenuList>
                </Menu>
                <Flex as={Link}  to="/explore" alignItems="center"  fontSize={20} fontWeight="bold" color="white" >Explore</Flex>
                <Flex  as={Link}  to="/purchasednfts"  alignItems="center" fontSize={20} fontWeight="bold" color="white">Purchased NFTs</Flex>
            </Flex>
            <Flex display={["none","none","flex","flex"]}>
            
            { account ? (
                <Button  
                height="50px"
                fontSize="20px"
                color="black"
                fontWeight="bold"
                width="175px"
                borderRadius="15px" 
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </Button>

            ): (
                <Button
                height="50px"
                fontSize="20px"
                color="black"
                fontWeight="bold"
                maxWidth="200px"
                borderRadius="15px"
                width="175px"
                _hover={{
                    background: "teal.500",
                  }}
                onClick={ConnectWallet}

             >
                    Connect Wallet
                </Button>

            )}
            </Flex>

            <Flex display={["flex","flex","none","none"]}>
                <IconButton
                    colorScheme='grey'
                    fontSize="24px"
                    alignItems="center"
                    onClick={onOpen}
                    icon={<HamburgerIcon />}
                />
                  
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='top'
                onClose={onClose}
                display={["flex","flex","none","none"]}
                size="full"
                colorScheme="grey"
            >
                <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton  size="lg" />
                            
                            <DrawerBody >
                                <Flex justifyContent="center" alignItems="center" height="55%" flexDirection="column" gap={9} padding={30} >
                                        <Flex  as={Link}  to="/" alignItems="center"  fontSize={25} fontWeight="bold" color="black" onClick={onClose}>Home</Flex>
                                        <Flex  as={Link}  to="/create"  alignItems="center" fontSize={25} fontWeight="bold" color="black" onClick={onClose}>Create</Flex>
                                        <Flex  as={Link}  to="/generate"  alignItems="center" fontSize={25} fontWeight="bold" color="black" onClick={onClose}>Generate</Flex>
                                        <Flex  as={Link} to="/explore"  alignItems="center" fontSize={25} fontWeight="bold" color="black" onClick={onClose}>Explore</Flex>
                                        <Flex  as={Link} to="/purchasednfts"  alignItems="center" fontSize={25} fontWeight="bold" color="black" onClick={onClose}>Purchased NFTs</Flex>

                                </Flex>      
                                      
                                    <Flex justifyContent="center" height="45%" alignItems="flex-end" >
                                        {account ? 
                                         <Button
                                         height="60px"
                                         fontSize="22px"
                                         color="black"
                                         fontWeight="bold"
                                         width="200px"
                                         borderRadius="20px"
                                         fontFamily="cursive"
                                         _hover={{
                                             background: "teal.500",
                                         }}
                                         onClick={ConnectWallet}

                                     >
                                         {account.slice(0, 6) + '...' + account.slice(38, 42)}
                                     </Button>
                                        :  <Button
                                        height="60px"
                                        fontSize="22px"
                                        color="black"
                                        fontWeight="bold"
                                        width="200px"
                                        borderRadius="20px"
                                        fontFamily="cursive"
                                        _hover={{
                                            background: "teal.500",
                                        }}
                                        onClick={ConnectWallet}

                                    >
                                        Connect Wallet
                                    </Button>}
                                       

                                        </Flex>
                            </DrawerBody>
                           
                        </DrawerContent>
            </Drawer>

        </Flex>
    )

}
export default NAVBAR;