
import React from 'react'
import './Navbar.css'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import {Link} from 'react-router-dom'

import icon from '../Assest/icon.jpg'
import navbaricon from '../Assest/iconNavbar.jpg'

import {HiMenuAlt1} from 'react-icons/hi'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai'
import {Signup} from '../Signup/Signup'

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: singupisOpen,
    onOpen: signuponOpen,
    onClose: signuponClose } = useDisclosure();

  const btnRef = React.useRef();
  return (
    <div id='Navbar' >

<HiMenuAlt1 id='NavbarButton' ref={btnRef} colorScheme='teal' onClick={onOpen} />
      {/* <h1 id='NavbarH1'  > Urban Vibez"</h1> */}
      <Link to={`/`}>
      <img src={icon} alt="navbaricon" id='NavbarMainIconImage' />
      </Link>
      <div id='NavbarTopBarIcons'>
        <MdOutlineAccountCircle onClick={signuponOpen}   />
        <AiOutlineHeart/>
        <Link to={`/cart`} >
      <AiOutlineShoppingCart/>
        </Link>
      <Signup isOpen={singupisOpen} onClose={signuponClose} />
      </div>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
 
          <DrawerHeader><img id='Navbar_Icon' alt='icon' src={navbaricon}  /></DrawerHeader>
          {/* <DrawerCloseButton className='DrawerCloseButton' /> */}

          <DrawerBody>
          <ul id='NavbarItems' >
          <Link to={`/product`} onClick={onClose} >
            <li className='NavbarListitem'>Mens</li>
          </Link>
  
            <li  className='NavbarListitem' >Womens</li>
            <li  className='NavbarListitem' >Essence</li>
          </ul>


          </DrawerBody>

          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </div>
  )
}