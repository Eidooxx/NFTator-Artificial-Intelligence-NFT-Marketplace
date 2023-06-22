import { Flex,useToast } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import {ethers} from "ethers";
import NAVBAR from "./components/navabar.js";
import Home from "./components/Home.js";
import Create from "./components/create.js";
import EXPLORE from "./components/explore.js";
import GENERATENFT from "./components/generatenft.js";
import PURCHASEDNFTS from "./components/purchasednfts.js";
import { Routes,Route } from "react-router-dom";



function App() {

  const [provider,setprovider] = useState(null);
  const [signer,setsigner] = useState(null);
  const [account , setaccount] = useState(null); 
  const [network , setnetwork] = useState(null); 
  const [nftmarketplacecontractabi, setnftmarketplacecontract] = useState({});




  const toast = useToast();

  const Getproviderandnetwork = async () => {
    if (!window.ethereum){
      toast({
        title: 'Error',
        description: "Please install metamask wallet",
        position: "top",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }
    else{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setprovider(provider);
      const signer = await provider.getSigner();
      setsigner(signer);
      const network = await provider.getNetwork();
      setnetwork(network.chainId)
      console.log(provider)
      console.log(signer)
      console.log(network.chainId)
    }
  }

  useEffect (()=>{
    Getproviderandnetwork();
  },[])


  return (
    <Flex flexDirection="column">
      <NAVBAR provider={provider} signer={signer} network = {network} nftmarketplacecontractabi ={nftmarketplacecontractabi} setnftmarketplacecontract={setnftmarketplacecontract}  account={account} setaccount={setaccount}/>
      <Routes>
        <Route path="/" element = {<Home/>}/>      
        <Route path="create"  element = {<Create account ={account} nftmarketplacecontractabi= {nftmarketplacecontractabi}/>}/> 
        <Route path="generate" element = {<GENERATENFT account={account} nftmarketplacecontractabi = {nftmarketplacecontractabi} />}/>     
        <Route path="explore"  element = {<EXPLORE account={account} nftmarketplacecontractabi= {nftmarketplacecontractabi} />}/> 
        <Route path="purchasednfts" element = {<PURCHASEDNFTS  account={account} nftmarketplacecontractabi= {nftmarketplacecontractabi} />}/>      
      </Routes>
    </Flex>

      

  );
}

export default App;
