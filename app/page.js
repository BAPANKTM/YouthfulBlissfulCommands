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
import History from "./components/History/History";
import Links from "./components/Links/Links";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showFloater, setShowFloater] = useState(false);
  
  useEffect(() => {
    // Listen for custom navigation events
    const handleActionEvent = (event) => {
      if (event.detail && event.detail.type) {
        handleAction(event.detail.type);
      }
    };
    
    window.addEventListener('action', handleActionEvent);
    
    return () => {
      window.removeEventListener('action', handleActionEvent);
    };
  }, []);
  
  const [floaterContent, setFloaterContent] = useState({
    title: "",
    content: "",
    primaryText: "",
    secondaryText: "",
    onPrimary: () => {},
    onSecondary: () => {},
  });
  
  const handleAction = (action) => {
    console.log(`Action clicked: ${action}`);
    
    if (action === 'withdrawal') {
      setFloaterContent({
        title: "Withdrawal",
        content: "Withdrawal form here",
        primaryText: "Withdraw",
        secondaryText: "Cancel",
        onPrimary: () => {
          console.log("withdrawal submitted");
          setShowFloater(false);
        },
        onSecondary: () => {
          console.log("withdrawal cancelled");
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    } else if (action === 'help') {
      setFloaterContent({
        title: "Help & Support",
        content: "Help content here",
        primaryText: "Contact Support",
        secondaryText: "Close",
        onPrimary: () => {
          console.log("contact support");
          setShowFloater(false);
        },
        onSecondary: () => {
          console.log("help cancelled");
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    } else if (action === 'history') {
      setFloaterContent({
        title: "Withdrawal History",
        content: <History />,
        primaryText: "",
        secondaryText: "Close",
        onPrimary: () => {},
        onSecondary: () => {
          console.log("History closed");
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    } else if (action === 'links') {
      setFloaterContent({
        title: "My Links",
        content: <Links />,
        primaryText: "",
        secondaryText: "Close",
        onPrimary: () => {},
        onSecondary: () => {
          console.log("Links closed");
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    }
  };

  const handleUpload = (file) => {
    // Upload handling logic
    console.log("File uploaded:", file);
  };

  useEffect(() => {
    if (activeTab === 'history') {
      setFloaterContent({
        title: "Withdrawal History",
        content: <History />,
        primaryText: "",
        secondaryText: "Back",
        onPrimary: null,
        onSecondary: () => {
          console.log('History closed');
          setShowFloater(false);
          setActiveTab('home');
        },
      });
      setShowFloater(true);
    } else {
      // Close floater when switching to other tabs
      setShowFloater(false);
    }
  }, [activeTab]);

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
    // Handle different actions here
    if (action === 'withdrawal') {
      setFloaterContent({
        title: 'Withdrawal History',
        content: <History />,
        primaryText: "",
        secondaryText: "Back",
        onPrimary: () => console.log(`${action} confirmed`),
        onSecondary: () => {
          console.log(`History closed`);
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    } else if (action === 'links') {
      setFloaterContent({
        title: 'Links History',
        content: <Links />,
        primaryText: "",
        secondaryText: "Back",
        onPrimary: () => {},
        onSecondary: () => {
          console.log(`Links closed`);
          setShowFloater(false);
        },
      });
      setShowFloater(true);
    } else if (action === 'help') {
      setFloaterContent({
        title: action.charAt(0).toUpperCase() + action.slice(1),
        content: `This is the ${action} content.`,
        primaryText: "Confirm",
        secondaryText: "Cancel",
        onPrimary: () => console.log(`${action} confirmed`),
        onSecondary: () => {
          console.log(`${action} cancelled`);
          setShowFloater(false);
        },
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
        onClose={() => {
          setShowFloater(false);
          if (activeTab === 'history') {
            setActiveTab('home');
          }
        }}
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