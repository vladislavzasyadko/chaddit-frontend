import React from "react";
import C from "./Card.module.css";
import cat from "../../icons/cat.png";
import {formatDate} from "../../utils/formatters";

function Card(props) {
    const {topicTitle, authorId, createdAt, color} = props;

    return (
        <div
            style={{
                height: "500px",
                width: "600px",
                backgroundColor: color,
            }}
            className={C.card}
        >
            <div
                style={{
                    backgroundImage: `url(${cat})`,
                    backgroundSize: "cover",
                    height: "50%",
                    width: "100%",
                    borderRadius: "5px",
                }}
            />
            <h2>{topicTitle}</h2>
            <span className={C.cardTextPreview}>{'sample description'}</span>
            <div>AUTHOR: {authorId}</div>
            <div>Created at: {formatDate(createdAt)}</div>
        </div>
    );
}

export default Card;
