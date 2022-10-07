export default function AddPlacePopup(props){

    function handleNameChange(e) {
        props.onSetCardData({
            name: e.target.value,
            link: props.cardData.link
        })
    }

    function handleLinkChange(e) {
        props.onSetCardData({
            name: props.cardData.name,
            link: e.target.value
        })
    }

    function handleAddPlace(e){
        e.preventDefault();
        props.onAddPlace(props.cardData);
    }

    return (
        <div className={props.isOpen ? `popup popup_open popup_type_new-place` : `popup popup_type_new-place`} id="popup-ep">
            <div className="popup__container">
                <button className="popup__close-button" type="button" id="pup-close" onClick={props.onClose}></button> 
                <form className="popup__form popup__form_type_profile-edit" onSubmit={handleAddPlace} name="editForm" id="edit-form" noValidate>
                    <h2 className="popup__text">Новое Место</h2>
                    <fieldset className="popup__input-container">
                        <input type="text" id="place-name" name="name" className="popup__input popup__input_type_place-name" placeholder="Название"  value={props.cardData.name} onChange={handleNameChange} minLength={2} maxLength={30} required/>
                        <span className="popup__url-input-error"></span>
                        <input type="url" value={props.cardData.link} onChange={handleLinkChange} id="url-input" name="link" className="popup__input popup__input_type_image-url" placeholder="Ссылка на картинку" required />
                        <span className="popup__place-name-error"></span>
                        <button type="submit" name="button" className="popup__submit-button">Сохранить</button>
                    </fieldset>
                </form>
            </div>
            <div className="popup__overlay popup__overlay_type_edit" onClick={props.onClose}></div>
        </div>
    )
}