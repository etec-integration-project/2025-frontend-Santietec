import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import Navbar from './Navbar';
import { LOGO_PATH } from '../constants/images';

interface HeaderProps {
  showNav?: boolean;
  showSignIn?: boolean;
  hideLogo?: boolean;
  hideAll?: boolean;
}

const Header = ({ showNav = false, showSignIn = false, hideLogo = false, hideAll = false }: HeaderProps) => {
  const { currentProfile } = useProfile();

  if (hideAll) return null;

  return (
    <>
      {showNav && currentProfile ? (
        <Navbar />
      ) : (
        <header className={`flex items-center px-4 md:px-16 py-6 ${hideLogo ? 'justify-end' : 'justify-between'}`}>
          {!hideLogo && (
            <Link to="/">
              <img
                src={LOGO_PATH}
                alt="CineVerse"
                className="h-16 md:h-24"
              />
            </Link>
          )}
          {showSignIn && (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </header>
      )}
    </>
  );
};

export default Header; 