import React from "react";
import C from "./Card.module.css";
import {formatDate} from "../../utils/formatters";
import cat from '../../icons/cat.png';
import {connect} from "react-redux";

function Card(props) {
    const {
        threadTitle,
        cardId,
        createdAt,
        color,
        threadId,
        preview,
        isColorLight,
        authorName,
        image,
        views,
    } = props;

    const handleClick = () => {
        props.openCard(threadId);
    }

    const previewStyle = () => {
        return preview.length * 16 > 600 * 2
    }

    const formatViews = () => {
        return views ?? 0
    }

    const handleOpenAdminThread = e => {
        props.openThread(cardId)
        e.stopPropagation();
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
                    backgroundImage: `url(${image ? image : cat})`,
                    backgroundSize: "cover",
                    borderRadius: "5px",
                }}
            />
            <div className={C.cardText}>
                <div className={C.cardHeader}>
                    <h2 className={C.cardTitle}>{threadTitle}</h2>
                    {(props.userRole === 'ADMIN' || props.userRole === 'MOD') &&
                    <button className={C.changeThreadButton}
                    onClick={e => handleOpenAdminThread(e)}>{'Изменить'}</button>}
                </div>
                <span className={previewStyle() ?
                    (isColorLight ? C.cardTextPreviewGradientDark : C.cardTextPreviewGradientLight)
                    :
                    (isColorLight ? C.cardTextPreviewLight : C.cardTextPreview)}>{preview}</span>
                <div className={C.cardFooter}>
                    <div className={C.authorName} style={{
                        backgroundColor: isColorLight ? 'black' : 'white',
                        color: isColorLight ? 'white' : 'black'
                    }}>Автор: {authorName}</div>
                    <div className={C.cardDate} style={{
                        backgroundColor: isColorLight ? 'black' : 'white',
                        color: isColorLight ? 'white' : 'black'
                    }}>{formatDate(createdAt)}</div>
                    <div className={C.cardDate} style={{
                        backgroundColor: isColorLight ? 'black' : 'white',
                        color: isColorLight ? 'white' : 'black'
                    }}>{'views: ' + formatViews()}</div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userRole: state.user.userRole,
})

export default connect(mapStateToProps)(Card);
