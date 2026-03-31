import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Header from './components/Header'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'
import EventDetailPage from './pages/EventDetailPage'
import DashboardPage from './pages/mypage/DashboardPage'
import NotificationsPage from './pages/mypage/NotificationsPage'
import ProfilePage from './pages/mypage/ProfilePage'
import SettingsPage from './pages/mypage/SettingsPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MyEventsPage from './pages/mypage/MyEventsPage'
import FavoritesPage from './pages/mypage/FavoritesPage'
import AccountPage from './pages/mypage/AccountPage'
import NotificationSettingsPage from './pages/mypage/NotificationSettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import OrgSidebar from './components/OrgSidebar'
import ApplicantsPage from './pages/org/ApplicantsPage'
import EventsPage from './pages/org/EventsPage'
import NewEventPage from './pages/org/NewEventPage'
import SurveysPage from './pages/org/SurveysPage'
import SurveyEditPage from './pages/org/SurveyEditPage'
import TargetEditPage from './pages/org/TargetEditPage'
import CompanyPage from './pages/org/CompanyPage'
import StaffPage from './pages/org/StaffPage'
import EventEditPage from './pages/org/EventEditPage'
import StaffEditPage from './pages/org/StaffEditPage'
import SurveyNewPage from './pages/org/SurveyNewPage'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-ehaco-bg text-ehaco-text antialiased">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function OrgPage({ activePage, children }) {
  return (
    <div className="min-h-screen bg-ehaco-bg">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-ehaco-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 lg:pl-60">
          <div className="flex items-center gap-3">
            <a href="#/org/events" className="flex items-center">
              <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-7 object-contain" />
            </a>
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">主催者管理</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#/" className="text-xs text-muted hover:text-accent transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              参加者サイト
            </a>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <OrgSidebar activePage={activePage} />
      <main className="pt-14 lg:pl-56">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/mypage/dashboard" element={<DashboardPage />} />
        <Route path="/mypage/events" element={<MyEventsPage />} />
        <Route path="/mypage/favorites" element={<FavoritesPage />} />
        <Route path="/mypage/notifications" element={<NotificationsPage />} />
        <Route path="/mypage/notification-settings" element={<NotificationSettingsPage />} />
        <Route path="/mypage/profile" element={<ProfilePage />} />
        <Route path="/mypage/account" element={<AccountPage />} />
        <Route path="/mypage/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/org/applicants" element={<OrgPage activePage="applicants"><ApplicantsPage /></OrgPage>} />
      <Route path="/org/events" element={<OrgPage activePage="events"><EventsPage /></OrgPage>} />
      <Route path="/org/events/new" element={<OrgPage activePage="new-event"><NewEventPage /></OrgPage>} />
      <Route path="/org/events/:id/edit" element={<OrgPage activePage="events"><EventEditPage /></OrgPage>} />
      <Route path="/org/surveys" element={<OrgPage activePage="surveys"><SurveysPage /></OrgPage>} />
      <Route path="/org/surveys/new" element={<OrgPage activePage="surveys"><SurveyNewPage /></OrgPage>} />
      <Route path="/org/surveys/:id" element={<OrgPage activePage="surveys"><SurveyEditPage /></OrgPage>} />
      <Route path="/org/targets" element={<OrgPage activePage="targets"><TargetEditPage /></OrgPage>} />
      <Route path="/org/company" element={<OrgPage activePage="company"><CompanyPage /></OrgPage>} />
      <Route path="/org/staff" element={<OrgPage activePage="staff"><StaffPage /></OrgPage>} />
      <Route path="/org/staff/new" element={<OrgPage activePage="staff"><StaffEditPage /></OrgPage>} />
      <Route path="/org/staff/:id" element={<OrgPage activePage="staff"><StaffEditPage /></OrgPage>} />
      <Route path="/org/*" element={<OrgPage activePage=""><NotFoundPage /></OrgPage>} />
    </Routes>
    </>
  )
}

export default App
