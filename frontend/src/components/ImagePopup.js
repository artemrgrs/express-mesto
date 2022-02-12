import React from 'react';

function ImagePopup(props) {
  return (
        <div className={`popup image-popup ${props.card ? 'popup_is-opened' : ' '}`}>
            <div className="popup__container popup__container_function_image">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image"  src={props.card?.link} alt={props.card?.name}/>
                    <figcaption className="popup__caption">{props.card ? props.card.name : ""}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;