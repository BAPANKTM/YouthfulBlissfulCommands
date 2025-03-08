
import { useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import GreetingBanner from '../components/GreetingBanner';
import BalanceCard from '../components/BalanceCard';
import ActionButtons from '../components/ActionButtons';
import UploadSection from '../components/UploadSection';
import StatsSection from '../components/StatsSection';
import BottomNav from '../components/BottomNav';
import FloaterSystem from '../components/FloaterSystem';
import '../styles/globals.css';

export default function Home() {
  useEffect(() => {
    // Any global initialization can go here
    console.log('TeleShare app initialized');
  }, []);

  return (
    <div className="container">
      <Head>
        <title>TeleShare</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <Header />
      <GreetingBanner />
      <BalanceCard />
      <ActionButtons />
      <UploadSection />
      <StatsSection />
      <BottomNav />
      <FloaterSystem />
    </div>
  );
}
