import logo from '../../assets/logo.svg';
import './style.css';

function Logo() {
    return (
        <div className='logo'>
            <img
            src={logo}
            alt='logo'
            className='logo-img'
            ></img>
            <p><strong>Expert</strong>Capilar</p>
        </div>
    )
}

export default Logo;