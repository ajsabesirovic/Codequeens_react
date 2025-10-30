import { useState } from "react";

const PostCard = ({ post, user, comments, onUserClick }) => {
  const [visibleComments, setVisibleComments] = useState(3);

  const loadMoreComments = () => {
    setVisibleComments((prev) => Math.min(prev + 3, comments.length));
  };

  const hideComments = () => {
    setVisibleComments(3);
  };

  const displayedComments = comments.slice(0, visibleComments);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0) || "?"}</div>
          <div className="user-details">
            <h3 className="username" onClick={() => onUserClick(user?.id)}>
              {user?.name || "Unknown User"}
            </h3>
            <p className="user-email">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <div className="post-content">
        <h4 className="post-title">{post.title}</h4>
        <p className="post-body">{post.body}</p>
      </div>

      <div className="comments-section">
        <h4 className="comments-title">Comments ({comments.length})</h4>

        {displayedComments.length > 0 ? (
          <div className="comments-list">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong className="comment-author">{comment.name}</strong>
                  <span className="comment-email">({comment.email})</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments yet</p>
        )}

        <div className="comments-controls">
          {visibleComments < comments.length && (
            <button onClick={loadMoreComments} className="load-more-btn">
              Load More Comments ({comments.length - visibleComments} remaining)
            </button>
          )}

          {visibleComments > 3 && (
            <button onClick={hideComments} className="hide-comments-btn">
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
