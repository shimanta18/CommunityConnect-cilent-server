import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { auth } from "../../Components/firebase/firebase.init";
const Register = () => {
  const[success,setSuccess] = useState(false)
  const [ error,setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
    const handleRegister = (event)=>{
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value
        const terms = event.target.terms.checked;
        console.log('register Click', email,password,terms);

       // const length6Pattern = /^.{6,}$/;
       // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

        //if(!length6Pattern.test(password)){
        //  console.log('password didnt match');
      //    setError('Password must be 6 character or longer')
       //   return;
      //  }
      //  else if(!casePattern.test(password)){
       //   setError('Password must have at least one uppercase and one lower case character')
       //   return;
       // }
       // else if(!specialCharPattern.test(password)){
         // setError('Password must contain at least one special character(e.g.! # @ $ % ^ & *).')
         // return
        //}

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
if(!passwordPattern.test(password)){
  setError('Password must be at least 6 characters long and include uppercase, lowercase, and special characters.')
  return
}

setError('')
setSuccess(false);


if(!terms){
setError('Please accept our terms and condition')
return;
}
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
          console.log('after creation of new user',result.user);
          setSuccess(true)
          event.target.reset()
        })
        .catch(error =>{
          console.log('error happened',error.message);
          setError(error.message)
        })
    }

    const handleTogglePasswordShow = (event) =>{
event.preventDefault()
setShowPassword(!showPassword)
    }
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
  <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md">
    <div className="text-center lg:text-left">
      <h1 className="text-4xl font-bold text-center text-red-900 mb-6">Register now!</h1>
     
    </div>
    <div className="card bg-white/80 backdrop-blur-md w-full max-w-sm shrink-0 shadow-2xl border border-gray-100">
      <form onSubmit={handleRegister}>
        <div className="card-body ">
        <fieldset className="fieldset text-black">
          <label className="label text-gray-700 font-semibold">Email</label>
          <input type="email" name="email" className="w-full rounded-xl border border-gray-300 bg-white py-2 px-3 focus:ring-2 focus:ring-red-400 focus:outline-none" placeholder="Email" />
          <label className="label text-gray-700 font-semibold">Password</label>
          <div className="relative">
            <input type={showPassword? 'text' : 'password'} name="password" className="w-full rounded-xl border border-gray-300 bg-white py-2 px-3 focus:ring-2 focus:ring-red-400 focus:outline-none" placeholder="Password" />
            <button onClick={handleTogglePasswordShow} className="absolute right-3 top-2.5 text-gray-500 hover:text-red-600">
              {showPassword ? <FaEyeSlash></FaEyeSlash> :  <FaEye></FaEye>}
            </button>
          </div>
          <div>
            <fieldset className="fieldset  border-base-300 rounded-box w-64 border p-4">
  
  <label className="flex items-center gap-2 mt-2 bg-white ">
    <input type="checkbox" name="terms"  className="text-red-600  font-medium rounded-xl border border-gray-300" />
    Accept Our Terms and condition
  </label>
</fieldset>
          </div>
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        {
          success && <p className="text-green-500 text-sm text-center">Account Created Successfully</p>
        }
        {
          error && <p className="text-red-500">{error}</p>
        }
      </div>
      </form>
      <p className="text-center text-sm mt-3 text-gray-700">Already have an account? Please <Link className="text-red-700 font-medium hover:underline"  to="/login">Login</Link></p>
    </div>
  </div>
</div>
  )
}

export default Register
