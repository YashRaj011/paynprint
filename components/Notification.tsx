"use client";
import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

let nextId = 0;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showError = useCallback((message: string) => {
    const id = ++nextId;
    setNotifications((prev) => [...prev, { id, message }]);
    const timer = setTimeout(() => removeNotification(id), 5000);
    timersRef.current.set(id, timer);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ showError }}>
      {children}
      <div className="fixed top-24 right-0 z-100 flex flex-col gap-3 pointer-events-none pr-4">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl bg-red-600 px-5 py-4 text-white shadow-lg max-w-sm"
            >
              <span className="text-sm font-medium flex-1">{n.message}</span>
              <button
                onClick={() => removeNotification(n.id)}
                className="shrink-0 hover:bg-red-700 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
