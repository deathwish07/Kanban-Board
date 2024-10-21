import React, { useState } from "react";


import "./Editable.css";

function Editable(props) {
    const [isEditable, setIsEditable] = useState(false);
    const [inputText, setInputText] = useState(props.defaultValue || "");

    const submission = (e) => {
        e.preventDefault();
        if (inputText && props.onSubmit) {
            setInputText("");
            props.onSubmit(inputText);
        }
        setIsEditable(false);
    };

    return (
        <div className="editable">
            {isEditable ? (
                <form
                    className={`editable_edit ${props.editClass ? props.editClass : ""}`}
                    onSubmit={submission}
                >
                    <input
                        type="text"
                        value={inputText}
                        placeholder={props.placeholder || props.text}
                        onChange={(event) => setInputText(event.target.value)}
                        autoFocus
                    />
                    <div className="editable_edit_footer">
                        <button type="submit">{props.buttonText || "Add"}</button>

                        <svg onClick={() => setIsEditable(false)} className="closeIcon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" fill="#96A3B4" stroke="#96A3B4" stroke-width="2" />
                            <path d="M10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10C8.65685 10 10 8.65685 10 7Z" stroke="#96A3B4" stroke-width="6" stroke-dasharray="18.85 100" />
                            <path d="M6.99682 7.68089L4.81753 9.86018C4.72008 9.95763 4.60934 10.0041 4.48532 9.99971C4.36129 9.99528 4.25055 9.94434 4.15311 9.84689C4.05566 9.74945 4.00693 9.6365 4.00693 9.50804C4.00693 9.37959 4.05566 9.26663 4.15311 9.16919L6.31911 7.00318L4.13982 4.82388C4.04237 4.72643 3.99586 4.61348 4.00029 4.48503C4.00472 4.35657 4.05566 4.24362 4.15311 4.14617C4.25055 4.04872 4.36351 4 4.49196 4C4.62041 4 4.73337 4.04872 4.83081 4.14617L6.99682 6.32547L9.17612 4.14617C9.27357 4.04872 9.38652 4 9.51497 4C9.64343 4 9.75638 4.04872 9.85383 4.14617C9.95128 4.24362 10 4.35657 10 4.48503C10 4.61348 9.95128 4.72643 9.85383 4.82388L7.67453 7.00318L9.85383 9.18247C9.95128 9.27992 10 9.39066 10 9.51468C10 9.63871 9.95128 9.74945 9.85383 9.84689C9.75638 9.94434 9.64343 9.99307 9.51497 9.99307C9.38652 9.99307 9.27357 9.94434 9.17612 9.84689L6.99682 7.68089Z" fill="#E8EAED" />
                        </svg>

                    </div>
                </form>
            ) : (
                <p
                    className={`editable_display ${props.displayClass ? props.displayClass : ""
                        }`}
                    onClick={() => setIsEditable(true)}
                >
                    {props.text}
                </p>
            )}
        </div>
    );
}

export default Editable;