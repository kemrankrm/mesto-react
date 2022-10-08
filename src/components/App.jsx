import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../utils/utils.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    //CARDS SETUP
    const [cards, setCards] = useState([]);
    const [cardData, setCardData] = useState({
        name: '',
        link: ''
    })

    const [selectedCard, setSelectedCard] = useState({ isOpen: false, src: '', title: '' });

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState( false );
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState ( false );
    const [isEditAvaterPopupOpen, setIsEditAvaterPopupOpen] = useState( false );

    useEffect(() => {
        api.getUserData()
            .then(res => setCurrentUser(res))
            .catch(err => console.log(err));

            
        api.getInitialCards()
            .then((res) => setCards(res))
            .catch((err) => console.log(err));
    }, [])

    //Card Removing Fucntion
    const handleCardDelete = (card) => {
        api.removeCard(card._id)
            .then((res) => {
                setCards(cards.filter(item => {return item._id !== card._id}))
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    //Card Liking/Disliking Function
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(item => item._id === currentUser._id);
        (!isLiked ? api.putLike(card._id) : api.removeLike(card._id))
            .then((res) => {
                setCards(cards.map(item => {
                    return (item._id === card._id ? res : item)
                }))
            })
            .catch(err => console.log(err));
    }

    //Card Addition Function
    const handleAddPlaceSubmit = (cardData) => {
        api.postNewCard(cardData)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
                setCardData({name: '', link: ''})
            })
            .catch(err => console.log(err));
    }

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

    const handleEditProfileFormSubmit = (data) => {
        api.postUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    const handleEditAvatarSubmit = (data, inputRef) => {
        api.upploadAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
                inputRef.current.value = '';
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main 
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvater={handleEditAvatarClick} 
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}/>
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleEditProfileFormSubmit} />
                <EditAvatarPopup isOpen={isEditAvaterPopupOpen} onClose={closeAllPopups} onUploadAvatar={handleEditAvatarSubmit} />                
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} cardData={cardData} onSetCardData={setCardData}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>   
        </div>
  )};

export default App;
