/** @format */

// /** @format */

// import React, { useState } from "react";
// import "./CommentItems.css";
// import RecommendIcon from "@mui/icons-material/Recommend";

// function CommentItems({ mainData, setId, setUser, setText, setToggleBtn, comment, setComments, handleDelete, parentCommentId }) {
//     const [replying, setReplying] = useState(false);
//     const [editing, setEditing] = useState(false);
//     const [replyText, setReplyText] = useState("");
//     const [editText, setEditText] = useState("");
//     const [likes, setLikes] = useState(comment.likes || 0);

//     const handleReplySubmit = () => {
//         if (replyText) {
//             const newNestedComment = { id: Date.now(), likes: 0, text: replyText, comments: [] };
//             comment.comments.push(newNestedComment);
//             setComments((prevComments) => {
//                 const updatedComments = [...prevComments];
//                 localStorage.setItem("comments", JSON.stringify(updatedComments));
//                 return updatedComments;
//             });
//             setReplyText("");
//         }
//         setReplying(false);
//     };

//     const updateTextRecursively = (comments, targetId, newText) => {
//         return comments.map((c) => {
//             if (c.id === targetId) {
//                 return { ...c, text: newText };
//             } else if (c.comments && c.comments.length > 0) {
//                 const updatedSubComments = updateTextRecursively(c.comments, targetId, newText);
//                 return { ...c, comments: updatedSubComments };
//             }
//             return c;
//         });
//     };

//     const handleEditSubmit = () => {
//         if (editText) {
//             setComments((prevComments) => {
//                 const updatedComments = updateTextRecursively(prevComments, comment.id, editText);
//                 localStorage.setItem("comments", JSON.stringify(updatedComments));
//                 setEditText("");
//                 return updatedComments;
//             });
//         }
//         setEditText("");
//         setEditing(false);
//     };

//     const handleNestedDelete = (nestedCommentId) => {
//         const updatedNestedComments = comment.comments.filter((nestedComment) => nestedComment.id !== nestedCommentId);
//         comment.comments = updatedNestedComments;

//         setComments((prevComments) => {
//             const updatedComments = [...prevComments];
//             localStorage.setItem("comments", JSON.stringify(updatedComments));
//             return updatedComments;
//         });
//         setLikes(comment.likes || 0);
//     };

//     const updateLikesRecursively = (comments, targetId) => {
//         return comments.map((c) => {
//             if (c.id === targetId) {
//                 return { ...c, likes: c.likes + 1 };
//             } else if (c.comments && c.comments.length > 0) {
//                 const updatedSubComments = updateLikesRecursively(c.comments, targetId);
//                 return { ...c, comments: updatedSubComments };
//             }
//             return c;
//         });
//     };

//     const handleLike = (targetId) => {
//         setLikes((prevLikes) => prevLikes + 1);

//         setComments((prevComments) => {
//             const updatedComments = updateLikesRecursively(prevComments, targetId);
//             localStorage.setItem("comments", JSON.stringify(updatedComments));
//             return updatedComments;
//         });
//     };

//     const handleEditing = (comment) => {
//         if (comment.user) {
//             setUser(comment.user);
//             setText(comment.text);
//             setId(comment.id);
//             setToggleBtn(true);
//         } else {
//             setEditing((prevState) => !prevState);
//             setEditText(comment.text);
//         }
//     };

//     return (
//         <div className="comment-item">
//             <div className="comment-container">
//                 {comment.user && <p className="comment-text">Blog :: {comment.user}</p>}
//                 <div className="comment-text">Description :: {comment.text}</div>
//                 <div className="button-container">
//                     {replying ? (
//                         <div>
//                             <input className="reply-input" placeholder="Enter your reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
//                             <button className="reply-button" onClick={handleReplySubmit}>
//                                 Reply
//                             </button>
//                             <button className="cancel-button" onClick={() => setReplying(false)}>
//                                 Cancel
//                             </button>
//                         </div>
//                     ) : (
//                         <div>
//                             <button className="reply-button" onClick={() => setReplying(true)}>
//                                 Reply
//                             </button>
//                             <button className="delete-button" onClick={() => handleDelete(comment.id, parentCommentId)}>
//                                 Delete
//                             </button>
//                             <button className="btn fs-5" onClick={() => handleLike(comment.id)}>
//                                 <RecommendIcon /> ({likes})
//                             </button>
//                             {editing ? (
//                                 <div>
//                                     <input className="reply-input" placeholder="Edit your respense" value={editText} onChange={(e) => setEditText(e.target.value)} />
//                                     <button className="reply-button" onClick={handleEditSubmit}>
//                                         Update changes
//                                     </button>
//                                     <button className="cancel-button" onClick={() => setEditing(false)}>
//                                         Cancel
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <button className="edit-button" onClick={() => handleEditing(comment)}>
//                                     Edit
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <ul className="comment-list">
//                 {comment.comments.map((nestedComment) => (
//                     <li key={nestedComment.id} className="comment-item">
//                         <CommentItems comment={nestedComment} setComments={setComments} handleDelete={handleNestedDelete} parentCommentId={comment.id} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default CommentItems;

/** @format */

import React, { useState } from "react";
import "./CommentItems.css";
import RecommendIcon from "@mui/icons-material/Recommend";

function CommentItems({ mainData, setId, setUser, setText, setToggleBtn, comment, setComments, handleDelete, parentCommentId }) {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [editText, setEditText] = useState("");
    const [likes, setLikes] = useState(comment.likes || 0);

    const handleReplySubmit = () => {
        if (replyText) {
            const newNestedComment = { id: Date.now(), likes: 0, text: replyText, comments: [] };
            comment.comments.push(newNestedComment);
            setComments((prevComments) => {
                const updatedComments = [...prevComments];
                localStorage.setItem("comments", JSON.stringify(updatedComments));
                return updatedComments;
            });
            setReplyText("");
        }
        setReplying(false);
    };

    const updateTextRecursively = (comments, targetId, newText) => {
        return comments.map((c) => {
            if (c.id === targetId) {
                return { ...c, text: newText };
            } else if (c.comments && c.comments.length > 0) {
                const updatedSubComments = updateTextRecursively(c.comments, targetId, newText);
                return { ...c, comments: updatedSubComments };
            }
            return c;
        });
    };

    const handleEditSubmit = () => {
        if (editText) {
            setComments((prevComments) => {
                const updatedComments = updateTextRecursively(prevComments, comment.id, editText);
                localStorage.setItem("comments", JSON.stringify(updatedComments));
                setEditText("");
                return updatedComments;
            });
        }
        setEditText("");
        setEditing(false);
    };

    const handleNestedDelete = (nestedCommentId) => {
        const updatedNestedComments = comment.comments.filter((nestedComment) => nestedComment.id !== nestedCommentId);
        comment.comments = updatedNestedComments;

        setComments((prevComments) => {
            const updatedComments = [...prevComments];
            localStorage.setItem("comments", JSON.stringify(updatedComments));
            return updatedComments;
        });
        setLikes(comment.likes || 0);
    };

    const updateLikesRecursively = (comments, targetId) => {
        return comments.map((c) => {
            if (c.id === targetId) {
                return { ...c, likes: c.likes + 1 };
            } else if (c.comments && c.comments.length > 0) {
                const updatedSubComments = updateLikesRecursively(c.comments, targetId);
                return { ...c, comments: updatedSubComments };
            }
            return c;
        });
    };

    const handleLike = (targetId) => {
        setLikes((prevLikes) => prevLikes + 1);

        setComments((prevComments) => {
            const updatedComments = updateLikesRecursively(prevComments, targetId);
            localStorage.setItem("comments", JSON.stringify(updatedComments));
            return updatedComments;
        });
    };

    const handleEditing = (comment) => {
        if (comment.user) {
            setUser(comment.user);
            setText(comment.text);
            setId(comment.id);
            setToggleBtn(true);
        } else {
            setEditing((prevState) => !prevState);
            setEditText(comment.text);
        }
    };

    return (
        <div className="comment-item">
            {mainData === true ? (
                <div className="comment-container">
                    <h1>{mainData}</h1>
                    {comment.user && <p className="comment-text">Blog :: {comment.user}</p>}
                    <div className="comment-text">Description :: {comment.text}</div>
                    <div className="button-container">
                        {replying ? (
                            <div>
                                <input className="reply-input" placeholder="Enter your reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                                <button className="reply-button" onClick={handleReplySubmit}>
                                    Reply
                                </button>
                                <button className="cancel-button" onClick={() => setReplying(false)}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button className="reply-button" onClick={() => setReplying(true)}>
                                    Reply
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(comment.id, parentCommentId)}>
                                    Delete
                                </button>

                                <button className="btn fs-5" onClick={() => handleLike(comment.id)}>
                                    <RecommendIcon /> ({likes})
                                </button>
                                {editing ? (
                                    <div>
                                        <input className="reply-input" placeholder="Edit your respense" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                        <button className="reply-button" onClick={handleEditSubmit}>
                                            Update changes
                                        </button>
                                        <button className="cancel-button" onClick={() => setEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEditing(comment)}>
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="comment-container">
                    <h1>{mainData}</h1>
                    {comment.user && <p className="comment-text">Blog :: {comment.user}</p>}
                    <div className="comment-text">Description :: {comment.text}</div>
                    <div className="button-container">
                        {replying ? (
                            <div>
                                <input className="reply-input" placeholder="Enter your reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                                <button className="reply-button" onClick={handleReplySubmit}>
                                    Reply
                                </button>
                                <button className="cancel-button" onClick={() => setReplying(false)}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button className="reply-button" onClick={() => setReplying(true)}>
                                    Reply
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(comment.id, parentCommentId)}>
                                    Delete
                                </button>

                                <button className="btn fs-5" onClick={() => handleLike(comment.id)}>
                                    <RecommendIcon /> ({likes})
                                </button>
                                {editing ? (
                                    <div>
                                        <input className="reply-input" placeholder="Edit your respense" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                        <button className="reply-button" onClick={handleEditSubmit}>
                                            Update changes
                                        </button>
                                        <button className="cancel-button" onClick={() => setEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEditing(comment)}>
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <ul className="comment-list">
                {comment.comments.map((nestedComment) => (
                    <li key={nestedComment.id} className="comment-item">
                        <CommentItems comment={nestedComment} setComments={setComments} handleDelete={handleNestedDelete} parentCommentId={comment.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentItems;
