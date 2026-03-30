import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'
import EventDetailPage from './pages/EventDetailPage'
import DashboardPage from './pages/mypage/DashboardPage'
import NotificationsPage from './pages/mypage/NotificationsPage'
import ProfilePage from './pages/mypage/ProfilePage'
import SettingsPage from './pages/mypage/SettingsPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ehaco-bg text-ehaco-text antialiased">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/mypage/dashboard" element={<DashboardPage />} />
          <Route path="/mypage/notifications" element={<NotificationsPage />} />
          <Route path="/mypage/profile" element={<ProfilePage />} />
          <Route path="/mypage/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
