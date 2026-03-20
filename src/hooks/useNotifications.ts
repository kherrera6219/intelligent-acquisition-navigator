import { useState, useEffect, useCallback } from "react";

export type NotificationType =
  | "status_change"
  | "assignment"
  | "deadline"
  | "compliance_alert"
  | "ai_complete";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  resourceType?: string;
  resourceId?: string;
  readAt: string | null;
  createdAt: string;
}

const STORAGE_KEY = "procurityiq_notifications";

function loadFromStorage(): AppNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: AppNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full — ignore
  }
}

// Global in-memory list kept in sync with localStorage across hook instances
let _notifications: AppNotification[] = loadFromStorage();
const _listeners: Set<() => void> = new Set();

function notify() {
  _listeners.forEach((fn) => fn());
}

/** Push a new notification from anywhere in the app */
export function pushNotification(
  payload: Omit<AppNotification, "id" | "readAt" | "createdAt">
) {
  const item: AppNotification = {
    ...payload,
    id: crypto.randomUUID(),
    readAt: null,
    createdAt: new Date().toISOString(),
  };
  _notifications = [item, ..._notifications].slice(0, 50); // keep last 50
  saveToStorage(_notifications);
  notify();
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>(_notifications);

  useEffect(() => {
    const refresh = () => setNotifications([..._notifications]);
    _listeners.add(refresh);
    return () => { _listeners.delete(refresh); };
  }, []);

  const markRead = useCallback((id: string) => {
    _notifications = _notifications.map((n) =>
      n.id === id ? { ...n, readAt: new Date().toISOString() } : n
    );
    saveToStorage(_notifications);
    notify();
  }, []);

  const markAllRead = useCallback(() => {
    const now = new Date().toISOString();
    _notifications = _notifications.map((n) => ({ ...n, readAt: n.readAt ?? now }));
    saveToStorage(_notifications);
    notify();
  }, []);

  const clearAll = useCallback(() => {
    _notifications = [];
    saveToStorage(_notifications);
    notify();
  }, []);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return { notifications, unreadCount, markRead, markAllRead, clearAll };
}
