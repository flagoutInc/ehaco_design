import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import MypageSidebar from './components/MypageSidebar'
import OrgPage from './components/OrgPage'
import AdminLayout from './components/AdminLayout'

import SearchPage from './pages/SearchPage'
import EventDetailPage from './pages/EventDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PasswordResetPage from './pages/PasswordResetPage'
import ApplyPage from './pages/ApplyPage'
import ApplyCompletePage from './pages/ApplyCompletePage'
import OrganizerProfilePage from './pages/OrganizerProfilePage'
import OrganizersPage from './pages/OrganizersPage'
import AboutPage from './pages/AboutPage'
import ForOrganizersPage from './pages/ForOrganizersPage'
import CompanyInfoPage from './pages/CompanyInfoPage'
import TermsPage from './pages/TermsPage'
import OrgTermsPage from './pages/OrgTermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import ContactOrgPage from './pages/ContactOrgPage'
import NotFoundPage from './pages/NotFoundPage'

import DashboardPage from './pages/mypage/DashboardPage'
import NotificationsPage from './pages/mypage/NotificationsPage'
import ProfilePage from './pages/mypage/ProfilePage'
import SettingsPage from './pages/mypage/SettingsPage'
import MyEventsPage from './pages/mypage/MyEventsPage'
import FavoritesPage from './pages/mypage/FavoritesPage'
import AccountPage from './pages/mypage/AccountPage'
import NotificationSettingsPage from './pages/mypage/NotificationSettingsPage'
import NotificationDetailPage from './pages/mypage/NotificationDetailPage'
import FollowingPage from './pages/mypage/FollowingPage'

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

// Admin pages - lazy loaded (separate section of the app)
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminUsersPage = React.lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminOrganizersPage = React.lazy(() => import('./pages/admin/AdminOrganizersPage'))
const AdminAnalyticsPage = React.lazy(() => import('./pages/admin/AdminAnalyticsPage'))
const AdminNoticesPage = React.lazy(() => import('./pages/admin/AdminNoticesPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

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

function AdminFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-muted text-sm">読み込み中...</div>
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/organizer" element={<ContactOrgPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/apply" element={<ApplyPage />} />
        <Route path="/event/:id/apply/complete" element={<ApplyCompletePage />} />
        <Route path="/organizers" element={<OrganizersPage />} />
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
      <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminLayout /></Suspense>}>
        <Route index element={<Suspense fallback={<AdminFallback />}><AdminDashboardPage /></Suspense>} />
        <Route path="users" element={<Suspense fallback={<AdminFallback />}><AdminUsersPage /></Suspense>} />
        <Route path="organizers" element={<Suspense fallback={<AdminFallback />}><AdminOrganizersPage /></Suspense>} />
        <Route path="analytics" element={<Suspense fallback={<AdminFallback />}><AdminAnalyticsPage /></Suspense>} />
        <Route path="notices" element={<Suspense fallback={<AdminFallback />}><AdminNoticesPage /></Suspense>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
