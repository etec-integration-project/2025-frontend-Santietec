import React from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const { notifications, clearNotifications } = useNotifications();

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 rounded-lg shadow-lg overflow-hidden z-[1000]">
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <h3 className="font-bold text-white">Notificaciones</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <p className="text-gray-400 p-4 text-center">No hay notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 flex items-center space-x-3 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <img
                src={notification.image}
                alt=""
                className="w-24 h-14 object-cover rounded-sm flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">{notification.title}</h4>
                <p className="text-xs text-gray-400">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={clearNotifications}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Borrar todas las notificaciones
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;