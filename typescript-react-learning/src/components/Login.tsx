import { useState } from "react"
import axios from 'axios';
import "../index.css";
import { useNavigate } from 'react-router-dom';



export default function Login() {

    const [name, setUsername] = useState<string >('');
    const [password, setPassword] = useState<string>('');
    const [message ,setMessage] = useState<string | null >('');
    const navigate = useNavigate();

    const handleLogin = (e : any) => {
        e.preventDefault();
        console.log('Sending login request to backend...');
        axios.post('http://localhost:8080/login', {name, password})
            .then( r => {
                console.log('Response:', r.data);
                const token = r.data.token;
                localStorage.setItem('userId', r.data.id);
                if (token) {
                    localStorage.setItem('token', token); // Store token in localStorage
                    setMessage(r.data.message);
                    navigate("/homepage"); // Navigate to homepage after successful login
                } else {
                    setMessage("Token not returned. Something went wrong.");
                }
                console.log({message});
            })
            .catch (err => {
                if (err.response){
                    setMessage(err.response.data.error);
                }
            })
    }



    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-5xl font-bold tracking-tight text-gray-900">
              Webforum 
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="login" method="POST" className="space-y-6">
              <div >
                <label htmlFor="Name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    placeholder="Input Username"
                    name="username"
                    type="text"
                    value = {name}
                    required
                    onChange={(e) => {setUsername(e.target.value)}}
                    className="block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <p></p>
              </div>
  
              <div>
                <div className="justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    placeholder="Input Password"
                    name="password"
                    type="password"
                    value = {password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    required
                    className="block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  onClick= {handleLogin}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>

              
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register Now!
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  