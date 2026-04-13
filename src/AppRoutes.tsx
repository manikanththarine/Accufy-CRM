import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Signin from "./Access/Signin";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import GenericPage from "./pages/GenericPage";
import Employees from "./pages/hrm/Employees";
import Recruitment from "./pages/hrm/Recruitment";
import TimeAttendance from "./pages/hrm/TimeAttendance";
import Payroll from "./pages/hrm/Payroll";
import Performance from "./pages/hrm/Performance";
import FinanceDashboard from "./pages/finance/Dashboard";
import GeneralLedger from "./pages/finance/GeneralLedger";
import Invoices from "./pages/finance/Invoices";
import Expenses from "./pages/finance/Expenses";
import Products from "./pages/inventory/Products";
import Orders from "./pages/inventory/Orders";
import Suppliers from "./pages/inventory/Suppliers";
import Organization from "./pages/admin/Organization";
import AccessControl from "./pages/admin/AccessControl";
import Accounts from "./pages/Accounts";
import Opportunities from "./pages/Opportunities";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Meetings from "./pages/Meetings";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute"
import AICopilot from "./pages/AICopilot";
export default function AppRoutes() {
    const { isAuthenticated, isInitializing } = useAuth();
    console.log(isAuthenticated)
    if (isInitializing) {
        return null; // Or a simple <div>Loading...</div>
    }
    return (
        <Routes>
            {/* Root redirect */}
            <Route
                index
                element={
                    <Navigate to={true ? "/" : "/signin"} replace />
                }
            />

            <Route path="signin" element={<Signin />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                    <Route path="up-next" element={<Dashboard />} />
                    <Route path="notifications" element={<GenericPage title="Notifications" />} />

                    {/* HRM */}
                    <Route path="hrm/employees" element={<Employees />} />
                    <Route path="hrm/recruitment" element={<Recruitment />} />
                    <Route path="hrm/time-attendance" element={<TimeAttendance />} />
                    <Route path="hrm/performance" element={<Performance />} />
                    <Route path="hrm/payroll" element={<Payroll />} />

                    {/* Finance */}
                    <Route path="finance/dashboard" element={<FinanceDashboard />} />
                    <Route path="finance/gl" element={<GeneralLedger />} />
                    <Route path="finance/invoices" element={<Invoices />} />
                    <Route path="finance/expenses" element={<Expenses />} />

                    {/* Inventory */}
                    <Route path="inventory/products" element={<Products />} />
                    <Route path="inventory/orders" element={<Orders />} />
                    <Route path="inventory/suppliers" element={<Suppliers />} />

                    {/* Admin */}
                    <Route path="admin/access-control" element={<AccessControl />} />
                    <Route path="admin/organization" element={<Organization />} />

                    {/* CRM */}
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="opportunities" element={<Opportunities />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="meetings" element={<Meetings />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="aicopilot" element={<AICopilot />} />

                    <Route path="chats/new" element={<GenericPage title="AI Copilot" />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>
        </Routes>
    );
}