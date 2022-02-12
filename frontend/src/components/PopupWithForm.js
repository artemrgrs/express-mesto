import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen ? 'popup_is-opened' : ' '}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" onClick={props.onClose}></button>
            <form className="form" name={props.name} onSubmit={props.onSubmit}>
            <h2 className="form__heading">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__save-button">{props.button}</button>
            </form>
        </div>
    </div> 
  );
}

export default PopupWithForm;           