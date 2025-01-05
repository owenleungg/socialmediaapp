import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

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
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  const deletePost = (postId) => {
    axios.delete(`http://localhost:3001/posts/${postId}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then(() => {
        setListOfPosts(
          listOfPosts.filter((val) => {
            return val.id != postId;
          })
        )
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              {value.username}{" "}
              <ThumbUp
                onClick={() => {
                  likeAPost(value.id);
                }}
              >
                {" "}
                Like
              </ThumbUp>
              <label> {value.Likes.length}</label>
              {authState.username === value.username && (
                <button
                  onClick={() => {
                    deletePost(value.id);
                  }}
                >
                  {" "}
                  Delete Post{" "}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
