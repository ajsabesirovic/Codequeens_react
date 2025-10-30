import { useState, useEffect } from "react";
import PostCard from "./PostCard";

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

        const [postsResponse, usersResponse, commentsResponse] =
          await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/comments"),
          ]);

        if (!postsResponse.ok || !usersResponse.ok || !commentsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();
        const commentsData = await commentsResponse.json();
        console.log(postsData, usersData, commentsData);

        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
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
