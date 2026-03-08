import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './components/home/Home_footer';
import Login from './components/Login/Login';

import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/admin/A_Dashboard/Dashboard';

import UsersPage from './pages/admin/User_Management/Users';
import AddUser from './pages/admin/User_Management/add_user';
import UserDetails from './pages/admin/User_Management/UserDetails';
import Departments from './pages/admin/Departments/Departments';
import DepartmentDetails from './pages/admin/Departments/DepartmentDetails';
import Profile from './components/admin/Profile';
import NoticeBoard from './pages/admin/NoticeBoard/NoticeBoard';
import CreateNotice from './pages/admin/NoticeBoard/CreateNotice';
import NoticeDetails from './pages/admin/NoticeBoard/NoticeDetails';
import Timetable from './pages/admin/Timetable/Timetable';
import Academics from './pages/admin/Academics/Academics';
import Requests from './pages/admin/Requests/Requests';
import Attendance from './pages/admin/Attendance/Attendance';
import Security from './pages/admin/Security/Security';
import Notifications from './pages/admin/Notifications/Notifications';
import FeeManagement from './pages/admin/Fees/FeeManagement';

import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { NoticeProvider } from './context/NoticeContext';
import { RequestProvider } from './context/RequestContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { SecurityProvider } from './context/SecurityContext';
import { TimetableProvider } from './context/TimetableContext';
import { SettingsProvider } from './context/SettingsContext';
import Settings from './pages/admin/Settings/Settings';

import { TeacherProvider } from './context/TeacherContext';
import { ExamProvider } from './context/ExamContext';
import { FeeProvider } from './context/FeeContext';
import TeacherLayout from './layout/TeacherLayout';
import TeacherDashboard from './pages/Teachers_staf/T_Dashboard/TeacherDashboard';
import MyClassesPage from './pages/Teachers_staf/my_classes/MyClassesPage';
import AttendancePage from './pages/Teachers_staf/attendance/AttendancePage';
import MarksPage from './pages/Teachers_staf/marks/MarksPage';
import TeacherTimetable from './pages/Teachers_staf/timetable/TeacherTimetable';
import TeacherNoticeBoard from './pages/Teachers_staf/notice/TeacherNoticeBoard';
import TeacherRequests from './pages/Teachers_staf/requests/TeacherRequests';
import TeacherResources from './pages/Teachers_staf/resources/TeacherResources';
import TeacherAnalytics from './pages/Teachers_staf/analytics/TeacherAnalytics';
import TeacherSettings from './pages/Teachers_staf/settings/TeacherSettings';

import StudentLayout from './layout/StudentLayout';
import StudentDashboard from './pages/Student/S_Dashboard/StudentDashboard';
import StudentTimetable from './pages/Student/timetable/StudentTimetable';
import StudentAttendance from './pages/Student/attendance/StudentAttendance';
import StudentMarks from './pages/Student/marks/StudentMarks';
import StudentNotices from './pages/Student/notice/StudentNotices';
import StudentResources from './pages/Student/resources/StudentResources';
import StudentRequests from './pages/Student/requests/StudentRequests';
import StudentSettings from './pages/Student/settings/StudentSettings';
import StudentFees from './pages/Student/fees/StudentFees';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NoticeProvider>
          <RequestProvider>
            <AttendanceProvider>
              <SecurityProvider>
                <TimetableProvider>
                  <SettingsProvider>
                    <TeacherProvider>
                      <ExamProvider>
                        <FeeProvider>
                          <Router>
                            <Routes>
                              <Route path="/" element={<MainLayout />}>
                                <Route index element={<Home />} />
                                <Route path="login" element={<Login />} />
                              </Route>

                              <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="users" element={<UsersPage />} />
                                <Route path="users/add_user" element={<AddUser />} />
                                <Route path="users/:id" element={<UserDetails />} />
                                <Route path="departments" element={<Departments />} />
                                <Route path="departments/:deptName" element={<DepartmentDetails />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="notice-board" element={<NoticeBoard />} />
                                <Route path="notice-board/create" element={<CreateNotice />} />
                                <Route path="notice-board/:id" element={<NoticeDetails />} />
                                <Route path="timetable" element={<Timetable />} />
                                <Route path="academics" element={<Academics />} />
                                <Route path="requests" element={<Requests />} />
                                <Route path="attendance" element={<Attendance />} />
                                <Route path="fees" element={<FeeManagement />} />
                                <Route path="security" element={<Security />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="notifications" element={<Notifications />} />
                                {/* Add more admin routes here */}
                              </Route>

                              {/* Teacher Routes */}
                              <Route path="/teacher" element={<TeacherLayout />}>
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route path="dashboard" element={<TeacherDashboard />} />
                                <Route path="classes" element={<MyClassesPage />} />
                                <Route path="attendance" element={<AttendancePage />} />
                                <Route path="marks" element={<MarksPage />} />
                                <Route path="timetable" element={<TeacherTimetable />} />
                                <Route path="notices" element={<TeacherNoticeBoard />} />
                                <Route path="requests" element={<TeacherRequests />} />
                                <Route path="resources" element={<TeacherResources />} />
                                <Route path="analytics" element={<TeacherAnalytics />} />
                                <Route path="settings" element={<TeacherSettings />} />
                                {/* Add more teacher routes here */}
                              </Route>

                              {/* Student Routes */}
                              <Route path="/student" element={<StudentLayout />}>
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route path="dashboard" element={<StudentDashboard />} />
                                <Route path="timetable" element={<StudentTimetable />} />
                                <Route path="attendance" element={<StudentAttendance />} />
                                <Route path="marks" element={<StudentMarks />} />
                                <Route path="fees" element={<StudentFees />} />
                                <Route path="notices" element={<StudentNotices />} />
                                <Route path="resources" element={<StudentResources />} />
                                <Route path="requests" element={<StudentRequests />} />
                                <Route path="settings" element={<StudentSettings />} />
                                {/* Add more student routes here */}
                              </Route>
                            </Routes>
                          </Router>
                        </FeeProvider>
                      </ExamProvider>
                    </TeacherProvider>
                  </SettingsProvider>
                </TimetableProvider>
              </SecurityProvider>
            </AttendanceProvider>
          </RequestProvider>
        </NoticeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
