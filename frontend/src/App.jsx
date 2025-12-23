// Base Dependences Import
import React, { useState } from 'react'
import './App.css'
// Components Import
import { useLocalization } from './components/LocalizationContext.jsx';
import { headerText, textContent, get_local_id } from './components/LanguageContent.jsx';
import AuthorsContainer from './components/ParticipantListComponent.jsx';
import VideoStream from './components/VideoStream.jsx';
import Parameters from './components/Parameters.jsx';
import BurgerMenu from './components/BurgerMenu.jsx';
// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

function LocalizationBlock(){
  const { setLocal } = useLocalization();
  return(
      <div id="localization">
        <a onClick={() => setLocal("Eng")}>Eng</a>
        <a onClick={() => setLocal("Rus")}>Rus</a>
        <a onClick={() => setLocal("Kaz")}>Kaz</a>
      </div>
  );
}
AOS.init();

function page(lang){
  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <>
    <header>
      <button id="burger-menu-btn" onClick={() => setBurgerOpen(!burgerOpen)}><i className='bx  bx-menu-wide' style={{'color':'#ffffff'}}></i></button>
      <div id="anchors">
        <a href="#info-anchor">{headerText[lang][0]}</a>
        <a href="#authors-anchor">{headerText[lang][1]}</a>
        <a href="#sponsors-anchor">{headerText[lang][2]}</a>
        <a href="#support-anchor">{headerText[lang][3]}</a>
        <a href="#contacts-anchor">{headerText[lang][4]}</a>
      </div>
      <LocalizationBlock />
    </header>

    <BurgerMenu 
      open={burgerOpen}
      onClose={() => setBurgerOpen(false)}
    />

    <div className="delimeter">-</div>
    <div className="delimeter">-</div>

    <div id="main-container">
      <h1>{textContent[lang][0]}</h1>
      <p>{textContent[lang][1]}</p>

      <div className="delimeter">-</div>

      <div id="content-container" data-aos="fade-up">
        <VideoStream />
        <div>
          <h2>{textContent[lang][2]}</h2>
          <Parameters />
        </div>
      </div>

      <div className='delimeter'>-</div>

      <h2 id="info-anchor">{textContent[lang][3]}</h2>
      <div id="info-container">
        <div className="info-piece" data-aos="fade-up" data-aos-offset="30%">
          <h3>{textContent[lang][4]}</h3>
          <p>
            {textContent[lang][5]}<a href="#">DANA Smart City</a>. {textContent[lang][6]}
          </p>
        </div>
        <div className="info-piece" data-aos="fade-up">
          <h3>{textContent[lang][7]}</h3>
          <p>
          {textContent[lang][8]}
          </p>
        </div>
        <div className="info-piece" data-aos="fade-up">
          <h3>{textContent[lang][9]}</h3>
          <p>
          {textContent[lang][10]}
          </p>
        </div>
      </div>

      <div className='delimeter'>-</div>

      <h2 id="authors-anchor">{textContent[lang][11]}</h2>
      <AuthorsContainer/>

      <div className='delimeter'>-</div>
        
      <h2 id="sponsors-anchor">{textContent[lang][12]}</h2>
      <div id="sponsors-container">
        <div className="sponsor-card" data-aos="fade-up-right">
          <img src = "./dana-logo.png" alt="Dana School"/>
          <div>
            <h3 onClick={() => { window.location.href = 'https://danaschool.edu.kz/'; }}>DANA School</h3>
            <p>{textContent[lang][13]}</p>
          </div>
        </div>
        <div className="sponsor-card" data-aos="fade-up-left">
        <img alt="databot" src="./databot-logo.webp" width={"150px"}/>
          <div>
            <h3 onClick={() => { window.location.href = 'https://databot.us.com/'; }}>databot <sup>TM</sup></h3>
            <p>{textContent[lang][14]}</p>
          </div>
        </div>
      </div>

      <div className='delimeter'>-</div>

      <h2 id="support-anchor">{textContent[lang][15]}</h2>
      <div id="support-container">
        <p>{textContent[lang][16]}</p>
        <div id="support-refs">
          
          <button data-aos="fade-up" data-aos-duration="550" data-aos-offset="75vh" onClick={() => { window.location.href = 'https://t.me/dsc_greeenhouse_feedback_bot'; }}>Telegram Bot</button>
          
        </div>
      </div>

      <div className='delimeter'>-</div>

      <h2 id="contacts-anchor">{textContent[lang][17]}</h2>
      <div id="contacts-container" data-aos="fade-up" data-aos-offset="404013423413400%">
        <div className="contact-block" id="cb-1">
          <p>Vladimyr S: <a href="https://instagram.com/edu.projekt">edu.projekt</a></p>
          <p>Telegram Bot: <a href="https://t.me/dsc_greeenhouse_feedback_bot">DCSGreenhouseBot</a></p>
          <p>Made via <a href="https://github.com">GitHub</a></p>
          <p>DatabotDANA Team</p>
        </div>
        <div className="contact-block" id="cb-2">
          <p>DanaSchool Instagramm: <a href="https://instagram.com/dana_school_almaty/">dana_school_almaty</a></p>
          <p>Databot Instagram: <a href="https://instagram.com/databotusa/">databotusa</a></p>
          <p>DanaSchool website: <a href="https://danaschool.edu.kz">danaschool.edu.kz</a></p>
          <p>Databot website: <a href="https://databot.us.com">databot.us.com</a></p>
        </div>
      </div>

    </div>

    <footer>
      <p>©Dana Smart City 2025 - All rights reserved. Site was created by Metsler A.</p>
    </footer>
  </>
  )
}

function App() {
  const { local } = useLocalization();
  let lang = get_local_id();

  return page(lang);
}

export default App

//<button data-aos="fade-right" data-aos-duration="250" data-aos-offset="70vh" onClick={() => { window.location.href = 'https://kaspi.kz/'; }} disabled>Kaspi (For KZ)</button>
//<button data-aos="fade-left" data-aos-duration="850" data-aos-offset="80vh" onClick={() => { window.location.href = 'https://donationalerts.com/'; }} disabled>Donate (For other countries)</button>
