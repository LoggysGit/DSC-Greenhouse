import React, { useState, useRef, useEffect } from 'react';
import { headerText, get_local_id } from './LanguageContent.jsx';

const BurgerMenu = ({ open, onClose }) => {
    const lang = get_local_id();

    return (
        <div id="burger-menu" className={open ? 'open' : ''}>
            <button id="close-btn" onClick={onClose}>✕</button>

            <a href="#info-anchor" onClick={onClose}>{headerText[lang][0]}</a>
            <a href="#authors-anchor" onClick={onClose}>{headerText[lang][1]}</a>
            <a href="#sponsors-anchor" onClick={onClose}>{headerText[lang][2]}</a>
            <a href="#support-anchor" onClick={onClose}>{headerText[lang][3]}</a>
            <a href="#contacts-anchor" onClick={onClose}>{headerText[lang][4]}</a>
        </div>
    );
};

export default BurgerMenu