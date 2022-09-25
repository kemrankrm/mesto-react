import avatarEditIcon from '../images/avatar-edit-button.svg'
import { useEffect, useState } from 'react'
import { api } from './utils/utils.js'
import Card from './Card.jsx';

function Main(props){
    const [cards, setCards] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        api.getInitialCards()
            .then((res) => setCards(res));

        api.getUserData()
            .then((res) => setUserData(res));
    }, [])

    return(
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userData.avatar} alt="аватар"/>
                    <img className="profile__avatar-edit-button" src={avatarEditIcon} onClick={props.onPopup} alt="Иконка редактирования аватарки" id="edit-avatar"/>
                    <div className="profile__overlay"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__name-button-container">
                        <h2 className = "profile__name">{userData.name}</h2>
                        <button className="profile__edit-button" type="button" onClick={props.onPopup} id="profile-edit"></button>
                    </div>
                    <h3 className="profile__description">{userData.about}</h3>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onPopup} id="new-place"></button>
            </section>

            <section className="elements">
                <Card cards={cards} onCardClick={props.onCardClick}/>
            </section>
        </main>
    )
}

export default Main;