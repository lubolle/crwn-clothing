import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
// React me permite importar logos o imagenes y transformarles en como si fueran componentes
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='shop'>
                        SHOP
                    </Link>
                    <Link className='nav-link' to='signin'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;