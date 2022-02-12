import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";
import { register, authorize, getUserData } from "../utils/auth";

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setEditPlacePopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [signedUp, setSignedUp] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

    const history = useHistory();

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
            
        if(jwt) {
            getUserData(jwt)
            .then(res => {
                setEmail(res.data.email);
                setLoggedIn(true);
                history.push('/');
            })
            .catch((err) => console.log(err));
        }
        },[history]);
    
    React.useEffect(() => {
        api.getAllNeededData()
        .then(res => {
            const [userData, cards] = res;
            setCurrentUser(userData);
            setCards(cards);
        })
        .catch((err) => console.log(err));
    },[]);
    

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }
    
    function handleEditProfileClick() {
        setEditProfilePopup(true);
    } 

    function handleAddPlaceClick() {
        setEditPlacePopup(true);
    } 

    function handleCardClick(props) {
        setSelectedCard(props);
    } 

    function closeAllPopups() {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setEditPlacePopup(false);
        setSelectedCard(null);
        setIsInfoToolTipOpen(false);
    }

    function handleUpdateUser(user) {
        api.setProfileInfo(user)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
          })
          .catch((err) => console.log(err));
    }
    
    function handleUpdateAvatar(user) {
        api.setProfileAvatar(user)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((err) => console.log(err));
    }

    function handleAddCard(card) {
        api.addCard(card)
        .then(res => {
            setCards([res, ...cards])
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    }

    function handleRegister(email, password) {
        register(email, password)
            .then(res => {
                if(res) {
                    setSignedUp(true);
                    setIsInfoToolTipOpen(true);
                    history.push('/sign-in');
                }
               
            })
            .catch((err) => {
                setSignedUp(false);
                setIsInfoToolTipOpen(true);
                console.log(err)
            });
    }

    function handleLogin(email, password) {
        authorize(email, password)
            .then(data => {
                if(data.token) {
                    setEmail(email)
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch((err) => console.log(err));
    }



    function onSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in')
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
            <div className="page">
                <Header email={email} loggedIn={loggedIn} onSignOut={onSignOut}/>
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path="/sign-up">
                        <Register handleRegister={handleRegister} />                        
                    </Route>
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin} />
                    </Route> 
                </Switch>
                <Footer />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}/>
                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser} />
                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups} 
                    onAddCard={handleAddCard} />
                {/* <PopupWithForm title="Вы уверены?" name="popup-delete" button="да" /> */}
                <ImagePopup 
                    card={selectedCard} 
                    onClose={closeAllPopups}/>
                <InfoTooltip 
                    isOpen={isInfoToolTipOpen} 
                    onClose={closeAllPopups}
                    signedUp ={signedUp} />
            </div>    
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;