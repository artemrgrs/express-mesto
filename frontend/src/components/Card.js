import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = isLiked ? "element__button element__button_state_active" : "element__button"; 

    function handleCardClick() {
        props.onCardClick(props.card);
    }  

    function handleLikeClick() {
        props.onCardLike(props.card);
    } 
    
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    } 

    return (
        <div className="element">
              <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                  <img className="element__image" src={props.card.link} alt={`${props.card.name}`} onClick={handleCardClick}/>
              <div className="element__info">
                  <h2 className="element__heading">{`${props.card.name}`}</h2>
                  <div className="element__like-container">
                      <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                      <p className="element__like-count">{`${props.card.likes.length}`}</p>
                  </div>
              </div>
          </div>
    )
}

export default Card;