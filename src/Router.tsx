import { Navigate, Route, Routes, Outlet } from "react-router";
import Layout from "./components/Layout";
import Sidebar from "./components/Layout/SideBar";
import { ROUTERS } from "./constant";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useUserStore } from "./store/useUserStore";
import { Suspense } from "react";
import HistoryDocument from "./pages/HistoryDocuments";
import CreateHistoryDocument from "./pages/CreateHistoryDocument";
import UpdateHistoryDocument from "./pages/UpdateHistoryDocument";
import QuizManagement from "./pages/QuizManagement";
import QuizDetail from "./pages/QuizDetail";
import Notification from "./pages/Notification";
import ForumManagement from "./pages/ForumManagement";
import ForumPostDetail from "./pages/ForumPostDetail";
import ForumPostReview from "./pages/ForumPostReview";
import UsersManagement from "./pages/UsersManagement";

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="size-12 animate-spin rounded-full border-y-2 border-blue-500"></div>
  </div>
);

const PrivateRoute = () => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={ROUTERS.LOGIN} />
  );
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? (
    <Navigate to={ROUTERS.DASHBOARD} />
  ) : (
    <>{children}</>
  );
};

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={ROUTERS.DEFAULT}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path={ROUTERS.HOME}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path={ROUTERS.HOME}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path={ROUTERS.LOGIN}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path={ROUTERS.DASHBOARD} element={<HistoryDocument />} />
            <Route
              path={ROUTERS.HISTORY_DOCUMENTS}
              element={<HistoryDocument />}
            />
            <Route
              path={ROUTERS.CREATE_HISTORY_DOCUMENT}
              element={<CreateHistoryDocument />}
            />
            <Route
              path={ROUTERS.UPDATE_HISTORY_DOCUMENT}
              element={<UpdateHistoryDocument />}
            />
            <Route path={ROUTERS.QUIZ} element={<QuizManagement />} />
            <Route path={ROUTERS.QUIZ_DETAIL} element={<QuizDetail />} />
            <Route path={ROUTERS.NOTIFICATION} element={<Notification />} />
            <Route path={ROUTERS.FORUM} element={<ForumManagement />} />
            <Route
              path={ROUTERS.FORUM_POST_DETAIL}
              element={<ForumPostDetail />}
            />
            <Route
              path={ROUTERS.FORUM_POST_REVIEW}
              element={<ForumPostReview />}
            />
            <Route path={ROUTERS.USERS} element={<UsersManagement />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
