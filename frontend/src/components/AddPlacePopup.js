import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [placeValue, setPlaceValue] = React.useState('');

    function handlePlaceChange(e) {
        setPlaceValue(e.target.value);
    }

    const [placeLinkValue, setPlaceLinkValue] = React.useState('');

    function handlePlaceLinkChange(e) {
        setPlaceLinkValue(e.target.value);
    }

    React.useEffect(() => {
        setPlaceValue('')
        setPlaceLinkValue('')
      },[props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
          name: placeValue,
          link: placeLinkValue
        });
      }

    return (
        <PopupWithForm title="Новое место" name="card-popup" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="form__user-info">
                <input id="title" type="text" className="form__field form__field_data_title"
                    name="name" value={placeValue || ''} placeholder="Название" required minLength="2" maxLength="40" onChange={handlePlaceChange}/>
                <span id="title-error" className="form__error">Вы пропустили это поле.</span>
                <input id="link" type="url" className="form__field form__field_data_link"
                    name="link" value={placeLinkValue || ''} placeholder="Ссылка на картинку"  required onChange={handlePlaceLinkChange}/>
                <span id="link-error" className="form__error">Вы пропустили это поле.</span>
            </fieldset>
        </PopupWithForm>
    );

}

export default AddPlacePopup;