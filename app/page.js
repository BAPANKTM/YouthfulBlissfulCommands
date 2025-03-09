"use client";
import { useState, useEffect } from "react";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Greeting from "./components/Greeting/Greeting";
import Balance from "./components/Balance/Balance";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import Upload from "./components/Upload/Upload";
import Stats from "./components/Stats/Stats";
import Navigation from "./components/Navigation/Navigation";
import Floater from "./components/Floater/Floater";
import SplashScreen from "./components/SplashScreen/SplashScreen";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showFloater, setShowFloater] = useState(false);
  const [floaterContent, setFloaterContent] = useState({
    title: "",
    content: "",
    primaryText: "",
    secondaryText: "",
    onPrimary: () => {},
    onSecondary: () => {},
  });

  const handleUpload = () => {
    console.log("Upload clicked");
    setFloaterContent({
      title: "Share Content",
      content: <Upload onUpload={() => {}} />,
      primaryText: "",
      secondaryText: "Cancel",
      onPrimary: () => {},
      onSecondary: () => {
        console.log("Cancel pressed");
        setShowFloater(false);
      },
    });
    setShowFloater(true);
  };

  const handleAction = (action) => {
    console.log(`Action clicked: ${action}`);
    // Handle different actions here (only withdrawal and help)
    if (action === 'withdrawal') {
      setFloaterContent({
        title: "Withdrawal",
        content: (
          <div className="withdrawal-content">
            <div className="icon-container">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V3M12 17L6 11M12 17L18 11" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 21H21" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="info-text">Enter the amount you wish to withdraw:</p>
            <div className="amount-input">
              <span className="currency">$</span>
              <input type="number" placeholder="0.00" min="0" step="0.01" />
            </div>
            <div className="withdrawal-methods">
              <div className="method active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9D5CFF" strokeWidth="2" />
                  <path d="M3 10H21" stroke="#9D5CFF" strokeWidth="2" />
                </svg>
                <span>Card</span>
              </div>
              <div className="method">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H9" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="16" r="4" stroke="#9D5CFF" strokeWidth="2" />
                </svg>
                <span>Wallet</span>
              </div>
              <div className="method">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.00002V3.00002H8V8.00002" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19V14" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11C3 9.93913 3.42143 8.92172 4.17157 8.17157C4.92172 7.42143 5.93913 7 7 7H17C18.0609 7 19.0783 7.42143 19.8284 8.17157C20.5786 8.92172 21 9.93913 21 11V17C21 18.0609 20.5786 19.0783 19.8284 19.8284C19.0783 20.5786 18.0609 21 17 21H7C5.93913 21 4.92172 20.5786 4.17157 19.8284C3.42143 19.0783 3 18.0609 3 17V11Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Gift</span>
              </div>
            </div>
          </div>
        ),
        primaryText: "Withdraw",
        secondaryText: "Cancel",
        onPrimary: () => console.log(`withdrawal confirmed`),
        onSecondary: () => console.log(`withdrawal cancelled`),
      });
      setShowFloater(true);
    } else if (action === 'help') {
      setFloaterContent({
        title: "Help Center",
        content: (
          <div className="help-content">
            <div className="help-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91895 12.4272 7.03871C13.1255 7.15847 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17H12.01" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="help-categories">
              <div className="help-category">
                <div className="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-text">
                  <h3>Account Support</h3>
                  <p>Profile and settings help</p>
                </div>
              </div>
              <div className="help-category">
                <div className="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-text">
                  <h3>Contact Us</h3>
                  <p>Chat with support</p>
                </div>
              </div>
              <div className="help-category">
                <div className="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91895 12.4272 7.03871C13.1255 7.15847 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17H12.01" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-text">
                  <h3>FAQ</h3>
                  <p>Common questions</p>
                </div>
              </div>
            </div>
          </div>
        ),
        primaryText: "Contact Support",
        secondaryText: "Close",
        onPrimary: () => console.log(`help confirmed`),
        onSecondary: () => console.log(`help cancelled`),
      });
      setShowFloater(true);
    }
  };

  return (
    <>
      <SplashScreen /> {/*Added SplashScreen */}
      <Container>
        <Header username="User" />
        <Greeting />
        <Balance value="0" />
        <ActionButtons openFloater={handleAction} />
        <Upload onUpload={handleUpload} />
        <Stats />
      </Container>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Floater
        isOpen={showFloater}
        onClose={() => setShowFloater(false)}
        title={floaterContent.title}
        primaryText={floaterContent.primaryText}
        secondaryText={floaterContent.secondaryText}
        onPrimary={floaterContent.onPrimary}
        onSecondary={floaterContent.onSecondary}
      >
        <div>{floaterContent.content}</div>
      </Floater>
    </>
  );
}

// We're now using the SplashScreen component from components/SplashScreen
