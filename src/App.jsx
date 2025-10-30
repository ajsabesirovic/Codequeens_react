import { useState } from "react";
import "./App.css";
import PostFeed from "./instagram/PostFeed";
import UserProfile from "./instagram/UserProfile";

function App() {
  const [currentPage, setCurrentPage] = useState("feed");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const goToUserProfile = (userId) => {
    setSelectedUserId(userId);
    setCurrentPage("profile");
  };
  const goToFeed = () => {
    setCurrentPage("feed");
    setSelectedUserId(null);
  };
  return (
    <div className="app">
      <header className="app-header">
        <div className="nav-buttons">
          <button
            onClick={() => setCurrentPage("feed")}
            className={currentPage === "feed" ? "active" : ""}
          >
            Instagram Feed
          </button>
        </div>
        {currentPage === "profile" && (
          <button onClick={goToFeed} className="back-button">
            ← Back to Feed
          </button>
        )}
      </header>
      {currentPage === "feed" && <PostFeed onUserClick={goToUserProfile} />}
      {currentPage === "profile" && <UserProfile userId={selectedUserId} />}
    </div>
  );
}
export default App;
