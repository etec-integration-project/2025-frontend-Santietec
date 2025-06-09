import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LikedItem {
  id: number;
  title: string;
  poster_path: string;
  type: 'movie' | 'tv';
}

interface LikedContextType {
  likedItems: LikedItem[];
  addToLiked: (item: LikedItem) => void;
  removeFromLiked: (itemId: number) => void;
  isLiked: (itemId: number) => boolean;
  loadLikedItems: () => void;
}

const LikedContext = createContext<LikedContextType | undefined>(undefined);

const LOCAL_KEY = 'cineverse_likeditems';

export const LikedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);

  const loadLikedItems = () => {
    const data = localStorage.getItem(LOCAL_KEY);
    setLikedItems(data ? JSON.parse(data) : []);
  };

  const saveLikedItems = (items: LikedItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  };

  const addToLiked = (item: LikedItem) => {
    setLikedItems(prevItems => {
      const newItems = [...prevItems, item];
      saveLikedItems(newItems);
      return newItems;
    });
  };

  const removeFromLiked = (itemId: number) => {
    setLikedItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      saveLikedItems(newItems);
      return newItems;
    });
  };

  const isLiked = (itemId: number) => {
    return likedItems.some(item => item.id === itemId);
  };

  useEffect(() => {
    loadLikedItems();
  }, []);

  return (
    <LikedContext.Provider
      value={{
        likedItems,
        addToLiked,
        removeFromLiked,
        isLiked,
        loadLikedItems
      }}
    >
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (context === undefined) {
    throw new Error('useLiked must be used within a LikedProvider');
  }
  return context;
}; 