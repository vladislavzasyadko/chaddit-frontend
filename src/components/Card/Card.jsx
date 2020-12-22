import React from "react";
import C from "./Card.module.css";
import cat from "../../icons/cat.png";
import {formatDate} from "../../utils/formatters";

function Card(props) {
    const {threadTitle, authorId, createdAt, color, threadId, preview} = props;

    const handleClick = () => {
        props.openCard(threadId);
    }

    return (
        <div
            style={{
                height: "500px",
                width: "600px",
                backgroundColor: color,
            }}
            className={C.card}
            onClick={handleClick}
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
            <h2 className={C.cardTitle}>{threadTitle}</h2>
            <span className={C.cardTextPreview}>{preview}</span>
            <div>Автор: {authorId}</div>
            <div className={C.cardDate}>{formatDate(createdAt)}</div>
        </div>
    );
}

export default Card;
