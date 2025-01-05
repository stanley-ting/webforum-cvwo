import axios from "axios";
import { useState } from "react";


export default function Register() {

    const [name, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [message, setMessage] = useState<string | null>('');

    const registerHandler = (e: any) => {
        e.preventDefault();

        console.log('Sending registeration request to backend...');

        if (password !== confirmPass) {
            setMessage("Passwords do not match");
            alert("Passwords do not match!");
            console.log("Password did not match");
        } else {
            axios.post('http://localhost:8080/register', { name, password })
                .then(r => {
                    console.log('Response:', r.data);
                    setMessage(r.data.message);
                })
                .catch(err => {
                    if (err.response) {
                        setMessage(err.response.data.error);
                    } else { setMessage("There was an error") }
                })
            setMessage("Registration Successful!");
            console.log("Form submitted successfully!");
        }

        


        setUsername("");
        setPassword("");
        setConfirmPass("");

    }


    return (


        <>

            <script src="https://cdn.tailwindcss.com"></script>
            <body className="min-h-screen flex items-center justify-center">
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Registration Form</h1>
                    <form className="w-full max-w-sm mx-auto  border-gray-300" method="POST" action="register">

                        <div className="mb-6">
                            <label className="block text-gray-900 text-sm font-medium mb-2" htmlFor="name">Name</label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-400"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-400"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 text-sm font-medium mb-2" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-400"
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Retype Password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                            />
                            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
                        </div>

                        <button
                            className="w-full bg-indigo-600 text-white text-sm font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
                            type="submit"
                            onClick={registerHandler}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </body>

        </>
    )
};