import './Home.css'
import { Link } from 'react-router-dom'
import { Footer } from '../Footer/Footer'

import top from '../Assest/top.png';
import image1 from '../Assest/1.png';
import image2 from '../Assest/2.png';
import image3 from '../Assest/3.png';
import image4 from '../Assest/4.png';
import image5 from '../Assest/5.png';
import image9 from '../Assest/9.png';
import image10 from '../Assest/10.png';
import image11 from '../Assest/11.png';
import image12 from '../Assest/12.png';
import image13 from '../Assest/13.png';

export const Home = () => {


  return (
    <div id='Home' >
      <div className="Home_Main_Div1">
        <div className='Home_Top_Image' >
          <img src={top} alt="" />
        </div>
        <div className="names">
          <h1>Urban Vibez </h1>
          <h3> <i>"Dress the Vibez that you Feel."</i> </h3>
        </div> 
      </div>
      <h1 id='Home_Heading_New_Arrival' >NEW ARRIVALS</h1>
     
      <div id='HomeDisplayDiv' >

    
        <img src={image1} alt="image1" />
        <img src={image2} alt="image2" />
        <img src={image3} alt="image3" />
        <img src={image4} alt="image4" />
        <img src={image5} alt="image5" />
      </div>
      <Link to={'product'} >  <button id='Home_See_More'  > SEE MORE </button>  </Link>
      <div className='Home_Main_Div3'>
        <img src={image9} alt="" />
        <img src={image10} alt="" />
        <img src={image11} alt="" />
        <img src={image12} alt="" />
        <img src={image13} alt="" />
      </div>
     <Footer/>
    </div>
  )
}
