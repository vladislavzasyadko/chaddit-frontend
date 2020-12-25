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

    // const ref = React.createRef()
    //
    // useEffect( () => {
    //     if(image){
    //         parseImage()
    //     }
    //
    // },[])
    //
    // const parseImage = () => {
    //     // const base64String = parseArrayBuffer(image)
    //     // const dataString = 'data:image/png;base64,' + base64String;
    //     // return dataString
    //     const content = JSON.parse(image)
    //     console.log(content)
    //     const imgData = URL.createObjectURL(
    //         new Blob([content.buffer], { type: 'image/png' } /* (1) */)
    //     );
    //     let img = new Image()
    //     img.src = imgData
    //     let base64content = arrayBufferToBase64(content.buffer);
    //     console.log(ref)
    //     const canvasContext = ref.current.getContext('2d');
    //     //'data:image/png;base64,' + base64content;
    //     ref.current.getContext('2d').drawImage(img, 0, 0, 100, 200);
    // }
    //
    // const parseArrayBuffer = () => {
    //     let binary = ''
    //     const array = Array.from(image);
    //     const fileByteArray = [];
    //     for (let i = 0; i < array.length; i++) {
    //         binary += String.fromCharCode(array[i])
    //     }
    //     return window.btoa(binary)
    // }
    //
    // const arrayBufferToBase64 = ( buffer ) => {
    //     let binary = '';
    //     let bytes = new Uint8Array( buffer );
    //     var len = bytes.byteLength;
    //     for (let i = 0; i < len; i++) {
    //         binary += String.fromCharCode( bytes[ i ] );
    //     }
    //     return window.btoa( binary );
    // }


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
                    backgroundImage: `url(${cat})`,
                    backgroundSize: "cover",
                    height: "50%",
                    width: "100%",
                    borderRadius: "5px",
                }}
            />
            {/*{image && <canvas ref={ref} id={`threadPic${threadId}`}> </canvas>}*/}
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
