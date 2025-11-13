import { NavLink } from 'react-router';
const Navbar = () => {
  const links = <>
  <li><NavLink to ="/">Home</NavLink></li>
  <li><NavLink to ="/CreateEvent"> Create Event</NavLink></li>
  <li><NavLink to ="/login">Login</NavLink></li>
  
  </>
  return (
    <div className="navbar bg-base-100 shadowsm bg-red-950 px-8">
  <div className="navbar-start">
    <div className="dropdown">
      
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 ">
        <li className="hover:bg-amber-700"><a>Events</a></li>
        {links}
      </ul>
    </div>
    <a className=" text-xl">CommunityConnect</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className="flex ">
     {links}
    </div>
     
    </ul>
  </div>
  <div className="navbar-end">
    <a className="bg-white text-black px-3 py-2 rounded-3xl transition-all cursor-pointer hover:bg-amber-700 hover:text-white">Join Now</a>
  </div>
</div>
  )
}

export default Navbar

