import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = ""
      },[props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return (
        <PopupWithForm title="Обновить аватар" name="avatar-popup" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="form__user-info">
                <input id="avatar-link" type="url" className="form__field form__field_data_link"
                    name="link" placeholder="Ссылка на картинку"  required ref={avatarRef}/>
                <span id="avatar-link-error" className="form__error">Вы пропустили это поле.</span>
            </fieldset>
        </PopupWithForm>
    );

}

export default EditAvatarPopup;