import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup (props){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            name,
            about: description
        })
    }

    useEffect(() => {
        //Seting the Form Elements Content
        setName(currentUser.name);
        setDescription(currentUser.about);
        
        // Esc Button Setup
        if(!props.isOpen) return;
        const handleEsc = (e) => {
            if(e.key === 'Escape'){
                props.onClose();
            }
        }
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [props, currentUser.name, currentUser.about]);



    return (
        <div className={props.isOpen ? `popup popup_open popup_type_profile-edit` : `popup popup_type_profile-edit`} id="popup-ep">
            <div className="popup__container">
                <button className="popup__close-button" type="button" id="pup-close" onClick={props.onClose}></button> 
                <form className="popup__form popup__form_type_profile-edit" name="editForm" onSubmit={handleSubmit} id="edit-form" noValidate>
                    <h2 className="popup__text">Редактировать Профиль</h2>
                    <fieldset className="popup__input-container">
                        <input type="text" id="name-input" name="name" value={name} onChange={handleNameChange} className="popup__input popup__input_type_name" placeholder="Введите имя" minLength="2" maxLength="40" required />
                        <span className="popup__job-input-error"></span>
                        <input type="text" id="job-input" name="job" value={description} onChange={handleDescriptionChange} className="popup__input popup__input_type_job" placeholder="Введите профессию" minLength="2" maxLength="200" required />
                        <span className="popup__name-input-error"></span>
                        <button type="submit" name="button" className="popup__submit-button">Сохранить</button>
                    </fieldset>
                </form>
            </div>
            <div className="popup__overlay popup__overlay_type_edit" onClick={props.onClose}></div>
        </div>
    )
}