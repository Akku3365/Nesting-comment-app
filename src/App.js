/** @format */

import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import CommentForm from "./CommentForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        setComments(savedComments);
    }, []);

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/blog" element={<CommentForm comments={comments} setComments={setComments} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
