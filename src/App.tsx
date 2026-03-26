/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Opportunities from './pages/Opportunities';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Meetings from './pages/Meetings';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import GenericPage from './pages/GenericPage';
import { AuthProvider } from './contexts/AuthContext';

// HRM
import Employees from './pages/hrm/Employees';
import Recruitment from './pages/hrm/Recruitment';
import TimeAttendance from './pages/hrm/TimeAttendance';
import Performance from './pages/hrm/Performance';
import Payroll from './pages/hrm/Payroll';

// Finance
import FinanceDashboard from './pages/finance/Dashboard';
import GeneralLedger from './pages/finance/GeneralLedger';
import Invoices from './pages/finance/Invoices';
import Expenses from './pages/finance/Expenses';

// Inventory
import Products from './pages/inventory/Products';
import Orders from './pages/inventory/Orders';
import Suppliers from './pages/inventory/Suppliers';

// Admin
import AccessControl from './pages/admin/AccessControl';
import Organization from './pages/admin/Organization';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" theme="light" />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/up-next" replace />} />
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

            {/* Legacy CRM routes - keeping them for now if they are linked anywhere, or can be removed if completely replaced by ERP */}
            <Route path="accounts" element={<Accounts />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="notes" element={<Notes />} />
            
            <Route path="chats/new" element={<GenericPage title="AI Copilot" />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
