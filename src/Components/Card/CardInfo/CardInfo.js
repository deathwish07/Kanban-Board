import React, { useEffect, useState } from "react";


import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";

function CardInfo(props) {
    // const [records, setRecords] = useState([]);
    // useEffect(()=> {
    //     fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
    //     .then(response => response.json())
    //     .then(data => setRecords(data))
    //     .catch(err => console.log(err))
    // },[])

    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];

    const [selectedColor, setSelectedColor] = useState();
    const [values, setValues] = useState({
        ...props.card,
    });

    const updateTitle = (value) => {
        setValues({ ...values, title: value });
    };

    const updateDesc = (value) => {
        setValues({ ...values, desc: value });
    };

    const addLabel = (label) => {
        const index = values.labels.findIndex((item) => item.text === label.text);
        if (index > -1) return;

        setSelectedColor("");
        setValues({
            ...values,
            labels: [...values.labels, label],
        });
    };

    const removeLabel = (label) => {
        const tempLabels = values.labels.filter((item) => item.text !== label.text);

        setValues({
            ...values,
            labels: tempLabels,
        });
    };

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random() * 2,
            completed: false,
            text: value,
        };
        setValues({
            ...values,
            tasks: [...values.tasks, task],
        });
    };

    const removeTask = (id) => {
        const tasks = [...values.tasks];

        const tempTasks = tasks.filter((item) => item.id !== id);
        setValues({
            ...values,
            tasks: tempTasks,
        });
    };

    const updateTask = (id, value) => {
        const tasks = [...values.tasks];

        const index = tasks.findIndex((item) => item.id === id);
        if (index < 0) return;

        tasks[index].completed = value;

        setValues({
            ...values,
            tasks,
        });
    };

    const calculatePercent = () => {
        if (!values.tasks?.length) return 0;
        const completed = values.tasks?.filter((item) => item.completed)?.length;
        return (completed / values.tasks?.length) * 100;
    };

    const updateDate = (date) => {
        if (!date) return;

        setValues({
            ...values,
            date,
        });
    };

    useEffect(() => {
        if (props.updateCard) props.updateCard(props.boardId, values.id, values);
    }, [values]);

    return (
        <Modal onClose={props.onClose}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">

                        <p>Title</p>
                    </div>
                    <Editable
                        defaultValue={values.title}
                        text={values.title}
                        placeholder="Enter Title"
                        onSubmit={updateTitle}
                    />
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">

                        <p>User</p>
                    </div>
                    <Editable
                        defaultValue={values.desc}
                        text={values.desc || "Add your username "}
                        placeholder="Enter username"
                        onSubmit={updateDesc}
                    />
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">

                        <p>Date</p>
                    </div>
                    <input
                        type="date"
                        defaultValue={values.date}
                        min={new Date().toISOString().substr(0, 10)}
                        onChange={(event) => updateDate(event.target.value)}
                    />
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">

                        <p>Labels</p>
                    </div>
                    <div className="cardinfo_box_labels">
                        {values.labels?.map((item, index) => (
                            <label
                                key={index}
                                style={{ backgroundColor: item.color, color: "#fff" }}
                            >
                                {item.text}

                                <svg onClick={() => removeLabel(item)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" fill="#96A3B4" stroke="#96A3B4" stroke-width="2" />
                                    <path d="M10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10C8.65685 10 10 8.65685 10 7Z" stroke="#96A3B4" stroke-width="6" stroke-dasharray="18.85 100" />
                                    <path d="M6.99682 7.68089L4.81753 9.86018C4.72008 9.95763 4.60934 10.0041 4.48532 9.99971C4.36129 9.99528 4.25055 9.94434 4.15311 9.84689C4.05566 9.74945 4.00693 9.6365 4.00693 9.50804C4.00693 9.37959 4.05566 9.26663 4.15311 9.16919L6.31911 7.00318L4.13982 4.82388C4.04237 4.72643 3.99586 4.61348 4.00029 4.48503C4.00472 4.35657 4.05566 4.24362 4.15311 4.14617C4.25055 4.04872 4.36351 4 4.49196 4C4.62041 4 4.73337 4.04872 4.83081 4.14617L6.99682 6.32547L9.17612 4.14617C9.27357 4.04872 9.38652 4 9.51497 4C9.64343 4 9.75638 4.04872 9.85383 4.14617C9.95128 4.24362 10 4.35657 10 4.48503C10 4.61348 9.95128 4.72643 9.85383 4.82388L7.67453 7.00318L9.85383 9.18247C9.95128 9.27992 10 9.39066 10 9.51468C10 9.63871 9.95128 9.74945 9.85383 9.84689C9.75638 9.94434 9.64343 9.99307 9.51497 9.99307C9.38652 9.99307 9.27357 9.94434 9.17612 9.84689L6.99682 7.68089Z" fill="#E8EAED" />
                                </svg>

                            </label>
                        ))}
                    </div>
                    <ul>
                        {colors.map((item, index) => (
                            <li
                                key={index + item}
                                style={{ backgroundColor: item }}
                                className={selectedColor === item ? "li_active" : ""}
                                onClick={() => setSelectedColor(item)}
                            />
                        ))}
                    </ul>
                    <Editable
                        text="Add Label"
                        placeholder="Enter label text"
                        onSubmit={(value) =>
                            addLabel({ color: selectedColor, text: value })
                        }
                    />
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">

                        <p>Tasks</p>
                    </div>
                    <div className="cardinfo_box_progress-bar">
                        <div
                            className="cardinfo_box_progress"
                            style={{
                                width: `${calculatePercent()}%`,
                                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                            }}
                        />
                    </div>
                    <div className="cardinfo_box_task_list">
                        {values.tasks?.map((item) => (
                            <div key={item.id} className="cardinfo_box_task_checkbox">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.completed}
                                    onChange={(event) =>
                                        updateTask(item.id, event.target.checked)
                                    }
                                />
                                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                            
                                <svg onClick={() => removeTask(item.id)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" fill="#96A3B4" stroke="#96A3B4" stroke-width="2" />
                                    <path d="M10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10C8.65685 10 10 8.65685 10 7Z" stroke="#96A3B4" stroke-width="6" stroke-dasharray="18.85 100" />
                                    <path d="M6.99682 7.68089L4.81753 9.86018C4.72008 9.95763 4.60934 10.0041 4.48532 9.99971C4.36129 9.99528 4.25055 9.94434 4.15311 9.84689C4.05566 9.74945 4.00693 9.6365 4.00693 9.50804C4.00693 9.37959 4.05566 9.26663 4.15311 9.16919L6.31911 7.00318L4.13982 4.82388C4.04237 4.72643 3.99586 4.61348 4.00029 4.48503C4.00472 4.35657 4.05566 4.24362 4.15311 4.14617C4.25055 4.04872 4.36351 4 4.49196 4C4.62041 4 4.73337 4.04872 4.83081 4.14617L6.99682 6.32547L9.17612 4.14617C9.27357 4.04872 9.38652 4 9.51497 4C9.64343 4 9.75638 4.04872 9.85383 4.14617C9.95128 4.24362 10 4.35657 10 4.48503C10 4.61348 9.95128 4.72643 9.85383 4.82388L7.67453 7.00318L9.85383 9.18247C9.95128 9.27992 10 9.39066 10 9.51468C10 9.63871 9.95128 9.74945 9.85383 9.84689C9.75638 9.94434 9.64343 9.99307 9.51497 9.99307C9.38652 9.99307 9.27357 9.94434 9.17612 9.84689L6.99682 7.68089Z" fill="#E8EAED" />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <Editable
                        text={"Add a Task"}
                        placeholder="Enter task"
                        onSubmit={addTask}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default CardInfo;