import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

import React from "react";
//Interface names must be same as the name in the db

//edit post will also take the post info as a prop
export default function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const updateHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(id);

    // Send updated data to the backend
    axios
      .put(`http://localhost:8080/posts/${id}`, {
        title,
        description,
        status,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the request body is sent as JSON
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Post updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating post:", err);
        setMessage("Failed to update the post");
      });
  };

  return (
    <>
      {" "}
      <Navbar />
      <h1 className=" mb-12 text-4xl font-bold tracking-tight text-blue-700 dark:text-gray">
        Update Favour
      </h1>
      <form className="max-w-lg mx-auto" method="put" onSubmit={updateHandler}>
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
            value={description}
            id="message"
            typeof="text"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a description..."
          />
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={(e) =>
              setStatus(e.target.checked ? "Complete" : "Incomplete")
            }
            checked={status === "Complete"}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                status === "Complete" ? "translate-x-5" : ""
              }`}
            ></div> 
          </div>
          <span className="  ms-3 text-sm font-bold text-gray-900 dark:text-blue-700">
            Mark as complete
          </span>
        </label>

        <button
          type="submit"
          className=" ml-20 mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update!
        </button>
      </form>
    </>
  );
}
