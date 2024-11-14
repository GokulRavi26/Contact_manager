import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ContactList from './Components/ContactList';
import SendMail from './Components/SendMail';
import AddContact from './Components/AddContact';
import Login from './Components/Login';
import Register from './Components/Register';
import axios from 'axios';
import './app.css';


function App() {
    const [contacts, setContacts] = useState([]);
    const [isAddContactVisible, setIsAddContactVisible] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Added this state for modal handling
    const navigate = useNavigate();

    useEffect(() => {
        if (user) fetchContacts();
    }, [user]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contact');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async (contact) => {
        try {
            await axios.post('http://localhost:5000/contact', contact);
            fetchContacts();
            closeModal();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const editContact = async (contact) => {
        try {
            await axios.put(`http://localhost:5000/contact/${contact.id}`, contact);
            fetchContacts();
            closeModal();
        } catch (error) {
            console.error('Error editing contact:', error);
        }
    };

    const deleteContact = async (phone) => {
        console.log('Attempting to delete contact with phone:', phone);
        try {
            const response = await axios.delete(`http://localhost:5000/contact/${phone}`);
            console.log('Delete response:', response);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    
    
    
    const toggleAddContactForm = () => {
        setIsAddContactVisible(!isAddContactVisible);
        setCurrentContact(null);
    };

    const closeModal = () => {
        setIsAddContactVisible(false);
        setCurrentContact(null);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLogin(false);
    };

    const handleRegister = (newUser) => {
        handleLogin(newUser);
    };

  

    return (
        <div className="app-container">
            <h1>Contact Manager</h1>
            {isLogin ? (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onRegister={handleRegister} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            ) : (
                <div>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <ContactList
                                        contacts={contacts}
                                        onDelete={deleteContact}
                                        onEdit={(contact) => {
                                            setCurrentContact(contact);
                                            setIsAddContactVisible(true);
                                        }}
                                        onAdd={toggleAddContactForm}
                                        user={user}
                                    />
                                    {isAddContactVisible && (
                                        <div className="add-contact-modal">
                                            <AddContact
                                                addContact={addContact}
                                                editContact={editContact}
                                                currentContact={currentContact}
                                                setCurrentContact={setCurrentContact}
                                                closeModal={closeModal}
                                            />
                                        </div>
                                    )}
                                </>
                            }
                        />
                        <Route path="/send-mail/:email" element={<SendMail />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    {showLogoutModal && (
                        <div className="logout-modal">
                            <p>Are you sure you want to log out?</p>
                            <button
                                onClick={() => confirmLogout(true)}
                                style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007bff', color: '#fff' }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => confirmLogout(false)}
                                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff' }}
                            >
                                No
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Wrapping the App component with BrowserRouter at the top level
function Main() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Main;
