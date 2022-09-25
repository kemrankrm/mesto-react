import headerLogo from '../images/headerLogo.svg';

function Header(){
    return(
        <header className="header">
            <img src={headerLogo} className="header__logo" alt="логотип" />
        </header>
    )
}

export default Header;