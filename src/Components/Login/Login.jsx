import React, { useEffect } from 'react'
import './Login.css'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    FormLabel,
    InputGroup,
    InputRightElement,
    useToast,

  } from '@chakra-ui/react'

  import logo from '../Assest/icon.jpg'
  import {PiEyeClosedBold,PiEyeBold} from  'react-icons/pi'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export const Login = ({isOpen,onClose}) => {
  const toast = useToast()
  const navigate = useNavigate();
  const[data,setdata] = useState([]);
  const [show, setshow] = useState(true)
  const [form, setform] = useState({
    email :"",
    password :""
  })
useEffect(()=>{
  axios.get(`http://localhost:8080/users`)
  .then((resp)=>{setdata(resp.data)})
  .catch((err)=>{console.log(err)})
},[])


const handlelogin = (e)=>{
  e.preventDefault();
  console.log(form,data)
  var found = data.find((user)=> user.email === form.email && user.password === form.password);
    
  console.log(found);
  if(found){
    toast({
      title: 'Login Successfull.',
      description: "Happy Shopping.",
      status: 'success',
      duration: 3000,
    })
    onClose(); 
    setform({
      email:"",
      password:""
    })
    navigate('/')
  }
  else{
    alert("Wrong Credentials")
  }
}
  return (
    <div  >
        <Modal  className="Modals"
         isOpen={isOpen} onClose={onClose}> 
  <ModalOverlay />
  <ModalContent>
    <ModalHeader><img id='LoginTopImage' src={logo} alt="logo" />
    </ModalHeader>
    <ModalBody>
        <form onSubmit={handlelogin} >
                <FormLabel>Email : <Input type="email" value={form.email} onChange={(e)=>{setform({...form,email:e.target.value})}} /> </FormLabel>
               
                <FormLabel>Password :
                  <InputGroup>
                  <Input pr='4.5rem' type={show ? "password":"text"}  placeholder='6+ Character' value={form.password}  onChange={(e)=>{setform({...form,password:e.target.value})}} / > 
                <InputRightElement >
                 {show ? <PiEyeClosedBold className='PasswordIcon' onClick={()=>{setshow(!show)}} /> : <PiEyeBold className='PasswordIcon' onClick={()=>{setshow(!show)}} />} 
                
                
                </InputRightElement>                 
                  </InputGroup>
                   </FormLabel>
                <Input id='SignupButton'  type='Submit' />
        </form>
    </ModalBody>

    <ModalFooter>
      
    </ModalFooter>
  </ModalContent>
</Modal>
    </div>
  )
}
