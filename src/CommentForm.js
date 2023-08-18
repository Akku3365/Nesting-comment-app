/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CommentInput from "./CommentInput";
import CommentItems from "./CommentItems";

const CommentForm = ({ comments, setComments }) => {
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [error, setError] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [mainData, setMainData] = useState('');

    useEffect(()=> {
        const user = localStorage.getItem("user");
        const mainUserData = user ? JSON.parse(user) : "";
        // console.log(mainUserData)
        setMainData(mainUserData)
    }, [])

    const navig = useNavigate();

    // console.log(mainData.isChecked)

    const handleCommentSubmit = () => {
        if (user && text) {
            setError(false);

            // Check if a comment with the same user or text already exists
            const existingCommentIndex = comments.findIndex((comment) => comment.id === id);

            if (existingCommentIndex !== -1 && toggleBtn) {
                // Update the existing comment
                const updatedComments = comments.map((comment, index) => {
                    if (index === existingCommentIndex) {
                        return {
                            ...comment,
                            user,
                            text,
                        };
                    }
                    return comment;
                });

                setComments(updatedComments);
                localStorage.setItem("comments", JSON.stringify(updatedComments));
            } else {
                // Add a new comment
                const newComment = { id: Date.now(), user, likes, text, comments: [] };
                const updatedComments = [...comments, newComment];
                setComments(updatedComments);
                localStorage.setItem("comments", JSON.stringify(updatedComments));
            }

            setText("");
            setUser("");
            setToggleBtn(false);
        } else {
            setError(true);
        }
    };

    const handleDelete = (commentId) => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
        localStorage.setItem("comments", JSON.stringify(updatedComments));
    };

    const backToSignup = () => {
        localStorage.removeItem("user");
        navig('/')
        
    }

    return (
        <div>
        {mainData ? (
            <>
            <div className="comment-form">
                <h2>Blog App</h2>
                <button className="btn btn-warning" onClick={backToSignup} >Logout</button>
                <div className="fs-4 mt-4">
                    <CommentInput user={user} mainData={mainData.isChecked} toggleBtn={toggleBtn} text={text} error={error} setUser={setUser} setText={setText} handleCommentSubmit={handleCommentSubmit} />
                </div>
            </div>
            <div>
                {comments.map((comment) => (
                    <CommentItems key={comment.id} mainData={mainData.isChecked} setToggleBtn={setToggleBtn} setId={setId} setLikes={setLikes} comment={comment} setComments={setComments} handleDelete={handleDelete} parentCommentId={null} setUser={setUser} setText={setText} />
                ))}
            </div>
            </>
        ) : (
            <h1>No data</h1>
        )}
            
        </div>
    );
};

export default CommentForm;
