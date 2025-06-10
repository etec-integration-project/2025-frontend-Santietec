import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getUpcomingMovies, getAiringTodayTVShows } from '../services/tmdbService';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string; // e.g., "Hace 2h", "Hace 1d"
  image: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((newNotification: Omit<Notification, 'id' | 'time'>) => {
    setNotifications((prevNotifications) => {
      const notificationWithIdAndTime: Notification = {
        ...newNotification,
        id: Date.now(), // Simple unique ID
        time: 'Recién', // For newly added notifications
      };
      // Limit to a reasonable number of notifications, e.g., 10
      const updatedNotifications = [notificationWithIdAndTime, ...prevNotifications].slice(0, 10);
      return updatedNotifications;
    });
  }, []);

  const fetchAndAddRecentContentNotifications = useCallback(async () => {
    try {
      const [upcomingMoviesResponse, airingTodayTVShowsResponse] = await Promise.all([
        getUpcomingMovies(1), // Get first page of upcoming movies
        getAiringTodayTVShows(1), // Get first page of TV shows airing today
      ]);

      const newMovies = upcomingMoviesResponse.results.slice(0, 3); // Get top 3 upcoming movies
      const newTVShows = airingTodayTVShowsResponse.results.slice(0, 3); // Get top 3 TV shows airing today

      newMovies.forEach((movie: any) => {
        addNotification({
          title: 'Película Nueva Disponible',
          message: `${movie.title} acaba de salir.`,
          image: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300',
        });
      });

      newTVShows.forEach((tvShow: any) => {
        addNotification({
          title: 'Serie Nueva Disponible',
          message: `${tvShow.name} se estrena hoy.`,
          image: tvShow.poster_path ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}` : 'https://via.placeholder.com/200x300',
        });
      });

    } catch (error) {
      console.error('Error fetching recent content for notifications:', error);
    }
  }, [addNotification]);

  useEffect(() => {
    // Fetch notifications on component mount
    fetchAndAddRecentContentNotifications();

    // Optionally, fetch periodically (e.g., every 30 minutes)
    const interval = setInterval(fetchAndAddRecentContentNotifications, 1800000); // 30 minutes

    return () => clearInterval(interval);
  }, [fetchAndAddRecentContentNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 