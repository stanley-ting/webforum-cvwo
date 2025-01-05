import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
//remember to add semi colon the end if not it will not render!

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [description, setDesc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.user_id;
  } else {
    console.log("Token not received");
  }

  const submitHandler = (e: any) => {
    e.preventDefault();

    console.log("Sending favour creation to backend");

    if (description === ''){
        console.log("desc is empty!");
    }

    //make sure the name is same as the json naming else it wont work, messed up the naming for description
    const postData = {
      user_id: userId,
      description,
      title,
      status: "Incomplete",
    };

    axios
      .post("http://localhost:8080/posts", postData)
      .then((r) => {
        console.log("Response:", r.data);
        setMessage(r.data.message);
        alert("Posted Successfully!");
        setTitle('');
        setDesc('');
    })
    .catch((err) => {
        if (err.response) {
            setMessage(err.response.data.error);
        } else {
            setMessage("There was an error, data not posted");
        }
    });

    
    
  };

  return (
    <>
      {" "}
      <Navbar />
      <h1 className=" mb-12 text-4xl font-bold tracking-tight text-blue-700 dark:text-gray">
        Create Favour!
      </h1>
      <form className="max-w-lg mx-auto" method="post" onSubmit={submitHandler}>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block font-bold mb-2 text-lg  text-gray-900 dark:text-blue-700"
          >
            Title
          </label>
          <input
            placeholder="Put a title.."
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="max-w-lg mx-auto">
          <label
            htmlFor="message"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-blue-700"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value = {description}
            id="message"
            typeof="text"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a description..."
          />
        </div>
        <button
          type="submit"
          className=" m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit!
        </button>
      </form>
    </>
  );
}
