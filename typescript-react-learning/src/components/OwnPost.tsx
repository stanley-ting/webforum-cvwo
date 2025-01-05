import { useState } from "react"
import axios from 'axios';
import "../index.css";

import React from 'react'
//Interface names must be same as the name in the db
interface PostProps {
  post: {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at : string
  };
}

export default function OwnPost({post} : PostProps){

  const { id, title, description, status ,created_at } = post;



  return (
    <div className="mb-6 max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Favours {id}
      </h5>
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mb-3 font-normal text-gray-900 dark:text-gray-900 border border-gray-300 rounded-lg max-w-xl m-5 p-8 dark:bg-white ">{description}</p>
      <p
        className={
          status === "Incomplete"
            ? "mb-3 font-normal text-red-700 dark:text-red-400 "
            : "mb-3 font-normal text-green-700 dark:text-green-400 "
        }
      >
        {status === "Incomplete" ? "INCOMPLETE": "COMPLETED"}
      </p>
      
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Created on : {new Date(created_at).toLocaleDateString()}</p>

      <a
        href ={`/my-posts/${id}/edit`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
       Edit Post
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  )
};