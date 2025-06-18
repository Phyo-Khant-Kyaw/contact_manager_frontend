import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "../pages/front/Contact";
import Login from "../pages/admin/auth/Login";
import ContactList from "../pages/admin/contact/ContactList";
import { AuthProvider } from "../store/auth";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <ContactList />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
