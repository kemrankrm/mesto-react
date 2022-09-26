export default function Card(props){
    function handleClick(){
        props.onCardClick(props.card.link, props.card.name)
    }
    return(
        <div className="elements__element">                    
        <button className="elements__remove-button" type="button"></button>
        <div className="elements__image-container" >
        <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        </div>
        <div className="elements__group">
            <h2 className="elements__name">{`${props.card.name}`}</h2>
            <div className="elements__like-container">
                <button className="elements__like-button" type="button" id="like-button"></button>
                <p className="elements__like-counter">{props.card.likes.length}</p>
            </div>
        </div>
        </div>
    )
}