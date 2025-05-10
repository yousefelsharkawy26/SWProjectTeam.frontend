import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DialogProvider from "./components/common/DialogWrapper";
import Dashboard from "./pages/Dashboard/Dashboard";
import Patients from "./pages/Patients/Patients";
import Appointments from "./pages/Appointments/Appointments";
import Treatments from "./pages/Treatments/Treatments";
import IStaff from "./pages/Staff/Staff";
import Inventory from "./pages/Inventory/Inventory";
import Billing from "./pages/Billing/Billing";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";
import MyAccount from "./pages/MyAccount/MyAccount";
import Posts from "./pages/Posts/Posts";
import AuthMainLayout from "./pages/Auth/AuthMainLayout";
import NotFound from "./pages/NotFound";
import DatabaseSettings from "./pages/Settings/DatabaseSettings";
import RequireAuth from "./components/auth/RequireAuth";
import RequireNotAuth from "./components/auth/RequireNotAuth";
import UserProvider from "./context/UserContext";
import ClinicProvider from "./context/ClinicContext";
import NormalUserAuth from "./components/auth/NormalUserAuth";
import PatientProfile from "./pages/Patients/PatientProfile";
import InventoryProvider from "./context/InventoryContext";
import DentistProvider from "./context/DentistContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <DialogProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <DentistProvider>
              <ClinicProvider>
                <InventoryProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <RequireNotAuth>
                            <AuthMainLayout />
                          </RequireNotAuth>
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <RequireNotAuth>
                            <AuthMainLayout />
                          </RequireNotAuth>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <RequireAuth>
                            <Settings />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Dashboard />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/patients"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Patients />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/patients/:id"
                        element={
                          <RequireAuth>
                            <PatientProfile />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/appointments"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Appointments />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/treatments"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Treatments />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/staff"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <IStaff />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/inventory"
                        element={
                          <RequireAuth>
                            <Inventory />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/billing"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Billing />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/reports"
                        element={
                          <RequireAuth>
                            <NormalUserAuth>
                              <Reports />
                            </NormalUserAuth>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/my-account"
                        element={
                          <RequireAuth>
                            <MyAccount />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/posts"
                        element={
                          <RequireAuth>
                            <Posts />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/database"
                        element={
                          <RequireAuth>
                            <DatabaseSettings />
                          </RequireAuth>
                        }
                      />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </InventoryProvider>
              </ClinicProvider>
            </DentistProvider>
          </TooltipProvider>
        </DialogProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
