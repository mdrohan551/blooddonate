import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js';

import 'bootstrap-icons/font/bootstrap-icons.css'
import "@fontsource/oswald"; // Defaults to weight 400
import "@fontsource/baloo-bhaijaan-2";
import '@fontsource/anton';
import '@fontsource/norwester';
import "./assets/css/common.css";
import "./assets/css/Footer.css";
import "./assets/css/SignUp.css";
import "./assets/css/Login.css";
import "./assets/css/Loader.css";
import "./assets/css/Verified.css";
import "./assets/css/Banner2.css";
import "./assets/css/Popu.css";
import "./assets/css/Profile.css";

import "./assets/css/update.css";
import "./assets/css/ProfileMenu.css";

import "./assets/css/Post.css";
import "./assets/css/style.css";
import "./assets/css/ResponsiveNav.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
