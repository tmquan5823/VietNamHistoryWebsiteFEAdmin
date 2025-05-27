import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: number | string;
  title: string;
  content: string;
  is_read: boolean;
  type?: string;
  url?: string;
  createdAt?: string;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    markAllAsRead(state) {
      state.notifications = state.notifications.map(n => ({ ...n, is_read: true }));
    },
    markAsRead(state, action: PayloadAction<number | string>) {
      state.notifications = state.notifications.map(n =>
        n.id === action.payload ? { ...n, is_read: true } : n
      );
    },
  },
});

export const { setNotifications, markAllAsRead, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

// Selectors
export const selectNotifications = (state: any) => state.notification.notifications;
export const selectUnreadCount = (state: any) =>
  state.notification.notifications.filter((n: Notification) => !n.is_read).length;
