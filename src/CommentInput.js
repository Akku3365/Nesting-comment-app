/** @format */

import React from "react";

function CommentInput({mainData, toggleBtn, error, user, setUser, text, setText, handleCommentSubmit }) {
    // console.log(mainData)
    return (
        <>
        {mainData ? (
            <div>
            <label htmlFor="floatingNameArea">Blog</label>
            <input className="form-control fs-2" id="floatingNameArea" value={user} onChange={(e) => setUser(e.target.value)} style={{ height: "100%" }} />

            <label htmlFor="floatingArea">Description</label>
            <textarea className="form-control fs-2" id="floatingArea" value={text} onChange={(e) => setText(e.target.value)} style={{ height: "100%" }} />

            <br />
            {error && <h4 className="text-danger">Both the fields are required</h4>}
            {toggleBtn ? (
                <button className="btn btn-primary fs-4 mt-2" onClick={handleCommentSubmit}>
                    save changes
                </button>
            ) : (
                <button className="btn btn-primary fs-4 mt-2" onClick={handleCommentSubmit}>
                    Post your blog
                </button>
            )}
        </div>
        ) : (
            ""
        )}
        </>
    );
}

export default CommentInput;
