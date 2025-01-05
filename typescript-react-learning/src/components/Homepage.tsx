import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import Navbar from "./Navbar";

export default function Homepage() {
  const [posts, setPosts] = useState<any[]>([]); // State to store the posts
  const [error, setError] = useState<string>(""); // State to handle errors

  // Fetch posts when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts") // Change this URL to match your backend API
      .then((response) => {
        setPosts(response.data); // Store the posts in state
      })
      .catch((err) => {
        setError("Failed to fetch posts");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;  // Display error message
  }


  return (
    <>
      {/**Need a component for each post Description, catorgy and date created */}
      <Navbar/>
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray">
        Welcome to the WebForum~~
      </h1>
      
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post: any) => (
            <Post key = {post.id} post = {post}></Post>
          ))
        )}
      </div>

    </>
  );
}
