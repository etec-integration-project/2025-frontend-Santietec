import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';
import ProfileMenu from './ProfileMenu';
import LogoutDialog from './LogoutDialog';
import { useProfile } from '../contexts/ProfileContext';
import SearchModal from './SearchModal';
import { LOGO_PATH } from '../constants/images';
import { searchContent } from '../services/search.service';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { currentProfile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchModal = document.querySelector('.search-modal-container');
      const searchInput = document.querySelector('.search-input-container');
      
      // Solo cerrar si el clic fue fuera del modal y del input de búsqueda
      if (!searchModal?.contains(event.target as Node) && !searchInput?.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchTerm('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = useCallback(async (query: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchContent(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setSearchResults([]);
      }
    }, 500);
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleSearchButtonClick = () => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutDialogOpen(true);
  };

  return (
    <>
      <nav className={`fixed w-full z-[999] transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}>
        <div className="px-4 md:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/browse">
              <img 
                src={LOGO_PATH}
                alt="CineVerse"
                className="h-5 md:h-9"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/browse" className="text-sm hover:text-gray-300">Inicio</Link>
              <Link to="/tv-shows" className="text-sm hover:text-gray-300">Series</Link>
              <Link to="/movies" className="text-sm hover:text-gray-300">Películas</Link>
              <Link to="/my-list" className="text-sm hover:text-gray-300">Mi Lista</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative search-input-container" ref={searchContainerRef}>
              <div className={`flex items-center bg-black transition-all duration-300 rounded-sm overflow-hidden ${
                isSearchOpen ? 'border border-white w-[250px]' : 'w-auto'
              }`}>
                <button 
                  onClick={handleSearchButtonClick}
                  className="p-2 hover:text-gray-300"
                  aria-label="Buscar"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
                {isSearchOpen && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar películas o series"
                    className="bg-black text-white px-2 py-1 flex-1 outline-none"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                  />
                )}
              </div>
            </div>

            <div className="relative">
              <button 
                className="hover:text-gray-300"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
              {isNotificationsOpen && <NotificationsPanel />}
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setIsProfileMenuOpen(true)}
                disabled={!currentProfile}
              >
                {currentProfile && (
                  <img
                    src={currentProfile.avatar_url}
                    alt={currentProfile.name}
                    className="w-8 h-8 rounded"
                  />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
              <ProfileMenu 
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Render SearchModal as a full-screen overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/95 z-[998] p-4 pt-20 overflow-y-auto search-modal-container">
          <SearchModal
            results={searchResults}
            searchTerm={searchTerm}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchTerm('');
              setSearchResults([]);
            }}
          />
        </div>
      )}

      <LogoutDialog 
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;