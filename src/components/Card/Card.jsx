import React, {createRef, useEffect} from "react";
import C from "./Card.module.css";
import cat from "../../icons/cat.png";
import {formatDate} from "../../utils/formatters";
import {useDispatch} from "react-redux";

function Card(props) {
    const {
        threadTitle,
        authorId,
        createdAt,
        color,
        threadId,
        preview,
        isColorLight,
        authorName,
        image,
    } = props;

    const handleClick = () => {
        props.openCard(threadId);
    }

    const previewStyle = () => {
        return preview.length * 16 > 600 * 2
    }

    return (
        <div
            style={{
                height: "500px",
                width: "600px",
                backgroundColor: color,
                color: isColorLight ? 'black' : '#d0d0d0',
            }}
            className={C.card}
            onClick={handleClick}
        >
            <div
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    height: "50%",
                    width: "100%",
                    borderRadius: "5px",
                }}
            />
            <h2 className={C.cardTitle}>{threadTitle}</h2>
            <span className={ previewStyle() ?
                (isColorLight ? C.cardTextPreviewGradientDark : C.cardTextPreviewGradientLight)
                :
                (isColorLight ? C.cardTextPreviewLight : C.cardTextPreview)} >{preview}</span>
            <div className={C.cardFooter}>
            <div>Автор: {authorName}</div>
            <div className={C.cardDate}>{formatDate(createdAt)}</div>
            </div>
        </div>
    );
}



export default Card;
