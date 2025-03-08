
import { useEffect } from 'react';
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
  useEffect(() => {
    // Fix any SVG rendering issues
    const svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => {
      if (!svg.getAttribute('viewBox') && svg.getAttribute('width') && svg.getAttribute('height')) {
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>TeleShare</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div className="container">
        <Header />
        <GreetingBanner />
        <BalanceCard />
        <ActionButtons />
        <UploadSection />
        <StatsSection />
      </div>

      <BottomNav />
      <Floater configs={floaterConfigs} />
    </>
  );
}
