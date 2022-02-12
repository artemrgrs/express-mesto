import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
        },[currentUser, props.isOpen]);


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm title="Редактировать профиль" name="profile-popup" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="form__user-info">
                <input id="name" type="text" className="form__field form__field_data_name"
                    name="name" value={name || ''} placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameChange}/>
                <span id="name-error" className="form__error"></span>
                <input id="occupation" type="text" className="form__field form__field_data_occupation"
                    name="about" value={description || ''} placeholder="Занятие" required minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
                <span id="occupation-error" className="form__error">Вы пропустили это поле.</span>
            </fieldset>
        </PopupWithForm>
      );
    }
    
    export default EditProfilePopup;