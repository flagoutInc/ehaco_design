import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

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
import RegisterPage from './pages/RegisterPage'
import PasswordResetPage from './pages/PasswordResetPage'
import MyEventsPage from './pages/mypage/MyEventsPage'
import FavoritesPage from './pages/mypage/FavoritesPage'
import AccountPage from './pages/mypage/AccountPage'
import NotificationSettingsPage from './pages/mypage/NotificationSettingsPage'
import NotificationDetailPage from './pages/mypage/NotificationDetailPage'
import FollowingPage from './pages/mypage/FollowingPage'
import NotFoundPage from './pages/NotFoundPage'
import ApplyPage from './pages/ApplyPage'
import ApplyCompletePage from './pages/ApplyCompletePage'
import OrganizerProfilePage from './pages/OrganizerProfilePage'
import AboutPage from './pages/AboutPage'
import ForOrganizersPage from './pages/ForOrganizersPage'
import CompanyInfoPage from './pages/CompanyInfoPage'
import TermsPage from './pages/TermsPage'
import OrgTermsPage from './pages/OrgTermsPage'
import PrivacyPage from './pages/PrivacyPage'
import MypageSidebar from './components/MypageSidebar'
import OrgSidebar from './components/OrgSidebar'
import OrgDashboardPage from './pages/org/OrgDashboardPage'
import ApplicantsPage from './pages/org/ApplicantsPage'
import ApplicantDetailPage from './pages/org/ApplicantDetailPage'
import EventsPage from './pages/org/EventsPage'
import NewEventPage from './pages/org/NewEventPage'
import EventEditPage from './pages/org/EventEditPage'
import EventPreviewPage from './pages/org/EventPreviewPage'
import EventMessagesPage from './pages/org/EventMessagesPage'
import SurveysPage from './pages/org/SurveysPage'
import SurveyEditPage from './pages/org/SurveyEditPage'
import SurveyNewPage from './pages/org/SurveyNewPage'
import SurveyResultsPage from './pages/org/SurveyResultsPage'
import TargetEditPage from './pages/org/TargetEditPage'
import CompanyPage from './pages/org/CompanyPage'
import StaffPage from './pages/org/StaffPage'
import StaffEditPage from './pages/org/StaffEditPage'
import OrgNotificationsPage from './pages/org/OrgNotificationsPage'
import OrgLoginPage from './pages/org/OrgLoginPage'
import OrgRegisterPage from './pages/org/OrgRegisterPage'

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

function MypageLayout() {
  const { pathname } = useLocation()
  const segments = pathname.split('/')
  const activePage = segments[2] || 'dashboard'
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pb-20 sm:pb-8">
      <MypageSidebar activePage={activePage} />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}

function OrgUserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition">
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-ehaco-border shadow-xl py-1 z-50">
          <a href="#/org/company" className="flex items-center gap-2 px-4 py-2.5 text-sm text-ehaco-text hover:bg-gray-50 transition" onClick={() => setOpen(false)}>
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            企業設定
          </a>
          <div className="my-1 border-t border-ehaco-border" />
          <a href="#/org/login" className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 transition" onClick={() => setOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            ログアウト
          </a>
        </div>
      )}
    </div>
  );
}

function OrgPage({ activePage, children }) {
  return (
    <div className="min-h-screen bg-ehaco-bg">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-ehaco-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 lg:pl-60">
          <div className="flex items-center gap-3">
            <a href="#/org/dashboard" className="flex items-center">
              <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-7 object-contain" />
            </a>
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">主催者管理</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#/org/notifications" className="relative text-muted hover:text-ehaco-text transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">2</span>
            </a>
            <a href="#/" className="text-xs text-muted hover:text-accent transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              参加者サイト
            </a>
            <OrgUserMenu />
          </div>
        </div>
      </header>
      <OrgSidebar activePage={activePage} />
      <main className="pt-14 lg:pl-56">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 pb-20 lg:pb-0">
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/for-organizers" element={<ForOrganizersPage />} />
        <Route path="/company" element={<CompanyInfoPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms/organizer" element={<OrgTermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/apply" element={<ApplyPage />} />
        <Route path="/event/:id/apply/complete" element={<ApplyCompletePage />} />
        <Route path="/organizer/:id" element={<OrganizerProfilePage />} />
        <Route path="/mypage" element={<MypageLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<MyEventsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="following" element={<FollowingPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="notifications/:id" element={<NotificationDetailPage />} />
          <Route path="notification-settings" element={<NotificationSettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/org/login" element={<OrgLoginPage />} />
      <Route path="/org/register" element={<OrgRegisterPage />} />
      <Route path="/org/notifications" element={<OrgPage activePage="notifications"><OrgNotificationsPage /></OrgPage>} />
      <Route path="/org/dashboard" element={<OrgPage activePage="dashboard"><OrgDashboardPage /></OrgPage>} />
      <Route path="/org/applicants" element={<OrgPage activePage="applicants"><ApplicantsPage /></OrgPage>} />
      <Route path="/org/applicants/:id" element={<OrgPage activePage="applicants"><ApplicantDetailPage /></OrgPage>} />
      <Route path="/org/events" element={<OrgPage activePage="events"><EventsPage /></OrgPage>} />
      <Route path="/org/events/new" element={<OrgPage activePage="new-event"><NewEventPage /></OrgPage>} />
      <Route path="/org/events/:id/edit" element={<OrgPage activePage="events"><EventEditPage /></OrgPage>} />
      <Route path="/org/events/:id/messages" element={<OrgPage activePage="events"><EventMessagesPage /></OrgPage>} />
      <Route path="/org/events/:id/preview" element={<OrgPage activePage="events"><EventPreviewPage /></OrgPage>} />
      <Route path="/org/surveys" element={<OrgPage activePage="surveys"><SurveysPage /></OrgPage>} />
      <Route path="/org/surveys/new" element={<OrgPage activePage="surveys"><SurveyNewPage /></OrgPage>} />
      <Route path="/org/surveys/:id" element={<OrgPage activePage="surveys"><SurveyEditPage /></OrgPage>} />
      <Route path="/org/surveys/:id/results" element={<OrgPage activePage="surveys"><SurveyResultsPage /></OrgPage>} />
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
