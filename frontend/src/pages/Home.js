import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfposts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfposts.map((post) => {
            if (post.id === postId) {
              if (response.data.Liked) {
                return { ...post, Likes: [...post.Likes, 0] }; // destructure likes array and add a random element(0) to represent a new like
              } else {
                const likesArray = post.Likes
                likesArray.pop()
                return { ...post, Likes: likesArray }; 
              }
            } else {
              return post;
            }
          })
        );
      });
  };
  return (
    <div>
      {listOfposts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {" "}
              {value.postText}{" "}
            </div>
            <div className="footer">
              {" "}
              {value.username} <button onClick={likeAPost}>Like</button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
