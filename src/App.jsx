import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import EventDetailPage from './pages/EventDetailPage'
import DashboardPage from './pages/mypage/DashboardPage'
import MyEventsPage from './pages/mypage/MyEventsPage'
import FavoritesPage from './pages/mypage/FavoritesPage'
import NotificationsPage from './pages/mypage/NotificationsPage'
import NotificationSettingsPage from './pages/mypage/NotificationSettingsPage'
import AccountPage from './pages/mypage/AccountPage'
import ProfilePage from './pages/mypage/ProfilePage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ehaco-bg text-ehaco-text">
      <Header />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/mypage/dashboard" element={<DashboardPage />} />
          <Route path="/mypage/events" element={<MyEventsPage />} />
          <Route path="/mypage/favorites" element={<FavoritesPage />} />
          <Route path="/mypage/notifications" element={<NotificationsPage />} />
          <Route path="/mypage/notification-settings" element={<NotificationSettingsPage />} />
          <Route path="/mypage/account" element={<AccountPage />} />
          <Route path="/mypage/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
