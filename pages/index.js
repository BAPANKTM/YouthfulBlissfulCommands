import React from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import GreetingBanner from '../components/ui/GreetingBanner';
import BalanceCard from '../components/ui/BalanceCard';
import ActionButtons from '../components/ui/ActionButtons';
import UploadSection from '../components/ui/UploadSection';
import StatsSection from '../components/ui/StatsSection';
import BottomNav from '../components/layout/BottomNav';
import Floater from '../components/ui/Floater';
import { floaterConfigs } from '../utils/floaterConfigs';

export default function Home() {
  return (
    <>
      <Head>
        <title>TeleShare</title>
        <meta name="description" content="Share your content and earn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <GreetingBanner />
        <BalanceCard />
        <ActionButtons />
        <UploadSection />
        <StatsSection />
      </main>
      <BottomNav />
      <Floater configs={floaterConfigs} />
    </>
  );
}