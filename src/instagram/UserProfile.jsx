import { useState, useEffect } from "react";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        const [userResponse, postsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
        ]);

        if (!userResponse.ok || !postsResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const postsData = await postsResponse.json();

        setUser(userData);
        setUserPosts(postsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    return () => {
      console.log("Cleanup from user");
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading user profile...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading user profile</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error">
        <h2>User not found</h2>
        <p>The requested user does not exist.</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">{user.name.charAt(0)}</div>
        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone">{user.phone}</p>
          <p className="profile-website">
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.website}
            </a>
          </p>
        </div>
      </div>

      <div className="profile-address">
        <h3>Address</h3>
        <p>
          {user.address.street}, {user.address.suite}
          <br />
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>

      <div className="profile-company">
        <h3>Company</h3>
        <p>
          <strong>{user.company.name}</strong>
        </p>
        <p>{user.company.catchPhrase}</p>
        <p>
          <em>{user.company.bs}</em>
        </p>
      </div>

      <div className="user-posts">
        <h2>
          Posts by {user.name} ({userPosts.length})
        </h2>
        <div className="posts-grid">
          {userPosts.map((post) => (
            <div key={post.id} className="user-post-card">
              <h4 className="post-title">{post.title}</h4>
              <p className="post-body">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
