import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">


{/*column 1 */}
            <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">CommunityConnect</h3>
            <p className="text-gray-600 leading-relaxed">
              Connecting people through social events, fostering community 
              engagement, and empowering positive change in local areas. Join us!
            </p>
          </div>

{/*column 2 */}
           <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Upcoming Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Create Event</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Joined Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Manage Events</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-3">
                <li><a href="mailto:info@communityconnect.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">info@communityconnect.com</a></li>
              <li><a href="tel:+15551234567" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">+8801562367509</a></li>
            </ul>
            <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaSquareInstagram className="h-6 w-6" /> 
                            </a>
                            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaSquareXTwitter className="h-6 w-6" /> 
                            </a>
                            <a href="#" aria-label="facebook" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaFacebookSquare className="h-6 w-6" /> 
                            </a>
                        </div>
          </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
