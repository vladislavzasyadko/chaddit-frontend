import React from "react";
import C from "./Card.module.css";
import cat from "../../icons/cat.png";

function Card(props) {
    console.log(props);
    const { color, name, text, info } = props;
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
            ></div>
            <h2>{name}</h2>
            <span className={C.cardTextPreview}>{text}</span>
            <div>{info}</div>
        </div>
    );
}

export default Card;
