import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ Correct import
import { auth } from "../../Components/firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email')


const Login = () => {
  const [error, setError] = useState('');
  const [user,setUser] = useState("null")
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log("Logged in user:", result.user);
        navigate("/create-event"); 
      })
      .catch(error => {
        console.error("Login error:", error.message);
        setError(error.message);
      });
  };

const handleGoogleSignIn=()=>{
  signInWithPopup(auth, googleProvider)
  .then(result=>{
        console.log (result.user);
        setUser(result.user);
        
      })
      .catch(error=>{
        console.log(error);
        
      })
    }

    const handleGithubSignIn=()=>{
signInWithPopup(auth , githubProvider)
.then(result => {
  console.log(result.user);
  setUser(result.user);
})
.catch(error=>{
  console.log(error)
})
    }
 const handleSignOut=()=>{
      signOut(auth)
      .then(()=>{
        console.log('sign out done');
        setUser(null)
      })
      .catch(error=>{
        console.log(error);
        
      })
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-6">Login now</h1>
        <form onSubmit={handleLogin}>
          <fieldset className="space-y-4 text-black">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-gray-300 bg-white py-2 px-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-xl border border-gray-300 bg-white py-2 px-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="text-right">
              <a className="text-sm text-blue-500 hover:underline cursor-pointer">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-neutral text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>

            <div className="text-center">
               {user ? <button onClick={handleSignOut} className="text-primary hover:underline font-semibold  text-black">Sign Out</button>
               :
               <>
               <button onClick={handleGoogleSignIn} className="btn btn-outline px-9 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl mb-2 text-center ">Sign In With Google</button>
              <button onClick={handleGithubSignIn} className="btn btn-outline px-9 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl mb-2 text-center">Sign In With Github</button>
               </>
}
{
  user && <div>
    <h3>{user?.displayName}</h3>
    <h5>Email:{user.email}</h5>
    <img src={user.photoURL}></img>
  </div>
}
            </div>
          </fieldset>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <p className="text-center text-sm mt-4 text-gray-700">
          New to our Website? Please{" "}
          <Link className="text-blue-400 underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
