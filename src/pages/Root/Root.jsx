import { Outlet } from 'react-router'
import Footer from '../../Components/footer/footer'

import Navbar from '../../Components/header/navbar'

const Root = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Root
