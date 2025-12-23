import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axiosInstance from "../api";

const PostFeed = ({ onUserClick }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [postsData, usersData, commentsData] = await Promise.all([
          axiosInstance.get("/posts"),
          axiosInstance.get("/users"),
          axiosInstance.get("/comments"),
        ]);

        setPosts(postsData.data);
        setUsers(usersData.data);
        setComments(commentsData.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getCommentsForPost = (postId) => {
    return comments.filter((comment) => comment.postId === postId);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading posts...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading posts</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="post-feed">
      <div className="posts-container">
        {posts.map((post) => {
          const user = getUserById(post.userId);
          const postComments = getCommentsForPost(post.id);

          return (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              comments={postComments}
              onUserClick={onUserClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostFeed;
