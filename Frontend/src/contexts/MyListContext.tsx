import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MyListItem {
  id: number;
  title: string;
  poster_path: string;
  type: 'movie' | 'tv';
  overview: string;
  vote_average: number;
}

interface MyListContextType {
  myList: MyListItem[];
  addToMyList: (item: MyListItem) => Promise<void>;
  removeFromMyList: (itemId: number) => Promise<void>;
  isInMyList: (itemId: number) => boolean;
  loadMyList: () => Promise<void>;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

const LOCAL_KEY = 'cineverse_mylist';

export const MyListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [myList, setMyList] = useState<MyListItem[]>([]);

  const loadMyList = async () => {
    const data = localStorage.getItem(LOCAL_KEY);
    setMyList(data ? JSON.parse(data) : []);
  };

  const saveMyList = (list: MyListItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  };

  const addToMyList = async (item: MyListItem) => {
    setMyList(prevList => {
      const newList = [...prevList, item];
      saveMyList(newList);
      return newList;
    });
  };

  const removeFromMyList = async (itemId: number) => {
    setMyList(prevList => {
      const newList = prevList.filter(item => item.id !== itemId);
      saveMyList(newList);
      return newList;
    });
  };

  const isInMyList = (itemId: number) => {
    return myList.some(item => item.id === itemId);
  };

  useEffect(() => {
    loadMyList();
  }, []);

  return (
    <MyListContext.Provider
      value={{
        myList,
        addToMyList,
        removeFromMyList,
        isInMyList,
        loadMyList
      }}
    >
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (context === undefined) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
}; 