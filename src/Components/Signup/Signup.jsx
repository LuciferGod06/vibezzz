import React from 'react'
import './Signup.css'

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
    useDisclosure,
    Alert,
    AlertIcon,
    useToast,
  } from '@chakra-ui/react'

  import logo from '../Assest/icon.jpg'
  import {PiEyeClosedBold,PiEyeBold} from  'react-icons/pi'
import { useState } from 'react'
import { Login } from '../Login/Login'
import axios from 'axios'

export const Signup = ({isOpen,onClose}) => {
const {onClose:loginonClose,
        isOpen:loginisOpen,
        onOpen:loginonOpen
} =  useDisclosure();

const toast = useToast();
  const [show, setshow] = useState(true)
  const [form, setform] = useState({
    name :"",
    email :"",
    no : "",
    password :"",
    repassword : ""

  })
const [alertcheck,setalertcheck] = useState(false);

const handleLogin = ()=>{
  loginonOpen();
  onClose();
}

const  handleform = (e)=>{
      e.preventDefault();

if (form.name === "" || form.email === ""||form.no === ""||form.password === ""||form.repassword === "" ){
  alert("Please Fill Whole form");
}
else if(form.password !== form.repassword){
  setalertcheck(true);
  
}  
else {
  setalertcheck(false);

  toast({
    title: 'Account created.',
    description: "We've created your account for you Please Login.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
  axios.post(`http://localhost:8080/users`, {
    name :form.name,
    email :form.email,
    no : form.no,
    password :form.password

  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  setform({
    name :"",
      email :"",
      no : "",
      password :"",
      repassword : ""
  })
}


      
    }

  return (
    <div>   
             

<Modal isOpen={isOpen} onClose={onClose}> 
  <ModalOverlay />
  <ModalContent>
    <ModalHeader><img id='LoginTopImage' src={logo} alt="logo" />
    </ModalHeader>
    <ModalBody>
        <form onSubmit={handleform} >
                <FormLabel> Name : <Input value={form.name} onChange={(e)=>{setform({...form,name:e.target.value})}} type="text" /> </FormLabel>
                <FormLabel>Email : <Input type="email" value={form.email} onChange={(e)=>{setform({...form,email:e.target.value})}}/> </FormLabel>
                <FormLabel>Contact No : <Input type="number" value={form.no} onChange={(e)=>{setform({...form,no:e.target.value})}}/> </FormLabel>
               
                <FormLabel>Password :
                  <InputGroup>
                  <Input pr='4.5rem' type={show ? "password":"text"}  placeholder='6+ Character' value={form.password} onChange={(e)=>{setform({...form,password:e.target.value})}} / > 
                <InputRightElement >
                 {show ? <PiEyeClosedBold className='PasswordIcon' onClick={()=>{setshow(!show)}} /> : <PiEyeBold className='PasswordIcon' onClick={()=>{setshow(!show)}} />} 
                
                
                </InputRightElement>                 
                  </InputGroup>
                   </FormLabel>
                <FormLabel>Re-enter Password : <Input type="text" placeholder='Re-enter Password'value={form.repassword} onChange={(e)=>{setform({...form,repassword:e.target.value})}} /> </FormLabel>
                <Input id='SignupButton'  type='Submit' />
        </form>
    </ModalBody>

    <ModalFooter>
        <p  style={{ margin:"auto"}} >

    Already have an account? <span onClick={handleLogin}> <u>Log In</u>  </span> 
        </p>
    </ModalFooter>
    {
  alertcheck && <Alert status='error' justifyContent={'center'}><AlertIcon /> Mismatch Password</Alert>
}
  </ModalContent>
</Modal>

<Login isOpen={loginisOpen} onClose={loginonClose}  />

    </div>
  )
}
