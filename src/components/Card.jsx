export default function Card(props){
    return(
        <>
            {props.cards?.map((item, index) => {
                return(
                    <div className="elements__element" key={index}>                    
                    <button className="elements__remove-button" type="button"></button>
                    <div className="elements__image-container" >
                    <img className="elements__image" src={item.link} alt={item.name} onClick={props.onCardClick} />
                    </div>
                    <div className="elements__group">
                        <h2 className="elements__name">{`${item.name}`}</h2>
                        <div className="elements__like-container">
                            <button className="elements__like-button" type="button" id="like-button"></button>
                            <p className="elements__like-counter">{item.likes.length}</p>
                        </div>
                    </div>
                    </div>
                )
            })}
        </>
    )
}