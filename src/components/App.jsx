
import '../index.css';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useState } from 'react';

function App() {

    const [popupState, setPopupState] = useState({ isOpen: false, type: ''})
    const [selectedCard, setSelectedCard] = useState({isOpen: false, src: '', title: ''});

    const handleCardClick = (e) => {
        setSelectedCard({isOpen: true, src: e.currentTarget.getAttribute('src'), title: e.currentTarget.getAttribute('alt') });
    }
    
    const handlePopupOpen = (e) => {
        setPopupState({ isOpen: true, type: e.currentTarget.id})
    }

    const closeAllPopups = (e) => {
        setPopupState({ isOpen: false })
        setSelectedCard({isOpen: false, src: '', alt: ''})
    }

    const checkKeyDown = (e) => {
        if(e.key === 'Escape'){
            closeAllPopups();
        }
    }
    
    document.addEventListener('keydown', checkKeyDown);

    return (
        <div className="page">
            <Header />
            <Main onPopup={handlePopupOpen} onCardClick={handleCardClick}/>
            <Footer />
            <PopupWithForm name={popupState.type} isOpen={popupState.isOpen} onClose={closeAllPopups}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />     
        </div>
  )};

export default App;
