import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../utils/utils.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';

function App() {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        api.getUserData()
            .then(res => setCurrentUser(res))
            .catch(err => console.log(err));
    }, [])

    const [selectedCard, setSelectedCard] = useState({ isOpen: false, src: '', title: '' });

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState( false );
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState ( false );
    const [isEditAvaterPopupOpen, setIsEditAvaterPopupOpen] = useState( false );

    const handleEditAvatarClick = () => {
        setIsEditAvaterPopupOpen( true );
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen( true );
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen( true );
    }

    const handleCardClick = (src, name) => {
        setSelectedCard({ isOpen: true, src: src, title: name });
    }

    const closeAllPopups = () => {
        setIsEditAvaterPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);

        setSelectedCard({isOpen: false, src: '', alt: ''})
    }

    const handleEditFormSubmit = (data) => {
        api.postUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            });
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvater={handleEditAvatarClick} onCardClick={handleCardClick}/>
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleEditFormSubmit} />

                <PopupWithForm name={'edit-avatar'} title={'Обновить аватар'} isOpen={isEditAvaterPopupOpen} onClose={closeAllPopups}>
                    <input type="url" id="avatar-url-input" name="link" className="popup__input popup__input_type_avatar-url" placeholder="Ссылка на картинку" required />
                    <span className="popup__error-avatar popup__avatar-url-input-error" id="avatar-url-error"></span>
                </PopupWithForm>

                <PopupWithForm name={'new-place'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <input type="text" id="place-name" name="name" className="popup__input popup__input_type_place-name" placeholder="Название" minLength="2" maxLength="30" required />
                    <span className="popup__url-input-error"></span>
                    <input type="url" id="url-input" name="link" className="popup__input popup__input_type_image-url" placeholder="Ссылка на картинку" required />
                    <span className="popup__place-name-error"></span>
                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>   
        </div>
  )};

export default App;
