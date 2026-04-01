import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from './AppRoutes'
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" theme="light" />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}