import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import Navbar from "./Navbar";
import EditPost from "./EditPost";
import OwnPost from "./OwnPost";

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]); // State to store the posts
  const [error, setError] = useState<string>(""); // State to handle errors
  const[message, setMessage] = useState<string | null>("");
  const token = localStorage.getItem("token");

  if (token != null){
    console.log(token);
  }

  // Fetch posts when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:8080/my-posts", {
        //retrieve the user jwt token to pull their data
        headers: {
            Authorization: `Bearer ${token}`,
      },
        }) // backend API
      .then((response) => {
        setMessage(response.data);
        setPosts(response.data.posts); // Store the posts in state
      })
      .catch((err) => {
        setError("Failed to fetch posts");
        console.log(err);
      });
  }, []);


  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  console.log(posts);
  console.log(message);

  return (
    <>
      {/**Need a component for each post Description, catorgy and date created */}
      <Navbar/>
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray">
        Your Posts
      </h1>
      
      <div>
        {posts.length === 0 ? (
          <p className="text-blue-700">You have not posted anything yet! Post now</p>
        ) : (
          posts.map((post: any) => (
            <OwnPost key = {post.id} post = {post}></OwnPost>
          ))
        )}
      </div>

    </>
  );
}
