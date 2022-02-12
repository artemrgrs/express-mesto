import React from 'react';
import authSuccessLogo from '../images/auth-success.png';
import authFailureLofo from '../images/auth-failure.png';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_is-opened' : ' '}`}>
            <div className="popup__container popup__container_function_auth-status">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <img src={props.signedUp ? authSuccessLogo : authFailureLofo} alt="Статус регистрации"/>
                <h2 className="popup__heading popup__heading_function_auth-status">{props.signedUp ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.' }</h2>
            </div>
        </div> 
      );
  }
  
export default InfoTooltip;