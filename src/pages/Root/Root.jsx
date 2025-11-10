import { Outlet } from 'react-router'
import Banner from '../../Components/banner/banner'
import Footer from '../../Components/footer/footer'
import Navbar from '../../Components/header/navbar'

const Root = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      <Banner></Banner>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Root
