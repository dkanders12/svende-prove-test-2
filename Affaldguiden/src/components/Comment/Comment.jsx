import React, { useState, useEffect } from "react";
import { supabase } from "../../provider/LoginContoller"; // Make sure this is correctly configured
import "./Comment.scss";
import { GiRamProfile } from "react-icons/gi";

const Comments = ({ siteId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();

    if (siteId) {
      fetchComments();
    }
  }, [siteId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("user_comments")
        .select("*")
        .eq("site_id", siteId) // Use site_id instead of product_id
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_comments")
        .insert([
          {
            site_id: siteId, // Use site_id to link the comment to the recycling site
            user_id: user.id,
            title: user.email,
            comment: newComment,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      setComments([data[0], ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  return (
    <div className="comments-section">
      <h2>Kommentarer</h2>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">
                <GiRamProfile />
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <strong>{comment.title}</strong>
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {user ? (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Skriv kommentar"
            rows="4"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to leave a comment.</p>
      )}
    </div>
  );
};

export default Comments;
