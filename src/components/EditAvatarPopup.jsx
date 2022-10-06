import { useRef } from "react"

export default function EditAvatarPopup(props) {

    const inputRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUploadAvatar({
            avatar: inputRef.current.value
        }, inputRef);
    }

    return (
        <div className={props.isOpen ? `popup popup_open popup_type_edit-avatar` : `popup popup_type_edit-avatar`} id="popup-ep">
            <div className="popup__container">
                <button className="popup__close-button" type="button" id="pup-close" onClick={props.onClose}></button> 
                <form className="popup__form popup__form_type_profile-edit" name="editForm" id="edit-form" onSubmit={handleSubmit} noValidate>
                    <h2 className="popup__text">Обновить аватар</h2>
                    <fieldset className="popup__input-container">
                        <input type="url" id="avatar-url-input" ref={inputRef} name="link" className="popup__input popup__input_type_avatar-url" placeholder="Ссылка на картинку" required />
                        <span className="popup__error-avatar popup__avatar-url-input-error" id="avatar-url-error"></span>
                        <button type="submit" name="button" className="popup__submit-button">Сохранить</button>
                    </fieldset>
                </form>
            </div>
            <div className="popup__overlay popup__overlay_type_edit" onClick={props.onClose}></div>
        </div>
    )
}