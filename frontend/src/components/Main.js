import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
        <section className="profile">
            <div className="profile__edit-cover" onClick={onEditAvatar}></div>
                <img className="profile__avatar" src={`${currentUser.avatar}`} alt="аватар"/>
            <div className="profile__container">
                <div className="profile__user-data">
                    <div className="profile__profile-info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
                    </div>
                    <p className="profile__occupation">{currentUser.about}</p>
                </div>
                <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
            </div>
        </section>

        <section className="elements">
            {cards.map(card => (
                <Card 
                    card={card}
                    key={card._id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    />
            ))
            }
        </section>
    </main>
  );
}

export default Main;