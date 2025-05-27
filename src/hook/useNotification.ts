import { useEffect, useState, useCallback } from "react";
import { useSocket } from "./useSocket";

export const useNotification = (
  userId: number | string | undefined,
  initialPage = 1,
  initialLimit = 5
) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasReceived, setHasReceived] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const socket = useSocket();

  // Reset page và notifications khi đổi userId
  useEffect(() => {
    setPage(initialPage);
    setNotifications([]);
  }, [userId, initialPage]);

  // Hàm fetch notification theo page/limit
  const refetchNotifications = useCallback(() => {
    if (socket && userId) {
      setIsLoading(true);
      socket.emit("getNotifications", { user_id: userId, page, limit });
    }
  }, [socket, userId, page, limit]);

  // Hàm đánh dấu notification là đã đọc
  const readNotification = useCallback((id: number | string) => {
    if (socket && userId) {
      socket.emit("readNotification", { id, user_id: userId });
      setTimeout(() => {
        refetchNotifications();
      }, 200);
    }
  }, [socket, userId, refetchNotifications]);

  // Hàm đánh dấu tất cả notification là đã đọc
  const readAllNotifications = useCallback(() => {
    if (socket && userId) {
      socket.emit("readAllNotifications", userId);
      setTimeout(() => {
        refetchNotifications();
      }, 200);
    }
  }, [socket, userId, refetchNotifications]);

  useEffect(() => {
    if (!socket || !userId) return;

    socket.on("connect", () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    refetchNotifications();

    socket.on("notifications", (data: any) => {
      // data: { notifications, total }
      if (Array.isArray(data)) {
        // backward compatibility
        setNotifications(data);
        setTotal(data.length);
      } else {
        setNotifications(prev => {
          if (page && page > 1) {
            // Nối thêm, loại bỏ lặp id
            const prevIds = new Set(prev.map((n: any) => n.id));
            const newOnes = (data.notifications || []).filter((n: any) => !prevIds.has(n.id));
            return [...prev, ...newOnes];
          } else {
            // Trang đầu, thay thế
            return data.notifications || [];
          }
        });
        setTotal(data.total || 0);
      }
      setIsLoading(false);
      setHasReceived(true);
    });

    socket.on("newNotification", (notification: any) => {
      if (notification.user_id === userId) {
        setNotifications((prev) => [notification, ...prev]);
        setHasReceived(true);
        setTotal((prev) => prev + 1);
      }
    });

    socket.on("connect_error", (err: any) => {
      setError(err);
      setIsLoading(false);
    });

    socket.on("notificationRead", (updatedNotification: any) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === updatedNotification.id ? updatedNotification : n
        )
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notifications");
      socket.off("newNotification");
      socket.off("connect_error");
      socket.off("notificationRead");
    };
  }, [socket, userId, refetchNotifications, page]);

  // Refetch khi đổi page/limit
  useEffect(() => {
    refetchNotifications();
  }, [refetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    isConnected,
    hasReceived,
    readNotification,
    readAllNotifications,
    page,
    setPage,
    limit,
    setLimit,
    total,
    refetchNotifications,
  };
}; 