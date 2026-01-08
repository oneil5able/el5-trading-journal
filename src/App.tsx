import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import './App.css';

// Import all your pages
import Dashboard from './Pages/Dashboard.jsx';
import Journal from './Pages/Journal.jsx';
import Portfolio from './Pages/portfolio.jsx';
import Spot from './Pages/Spot.jsx';
import Futures from './Pages/Futures.jsx';
import Margin from './Pages/Margin.jsx';
import Options from './Pages/Options.jsx';
import NFT from './Pages/NFT.jsx';
import Calculator from './Pages/Calculator.tsx';
import Analytics from './Pages/Analytics.jsx';
import Psychology from './Pages/Psychology.jsx';
import Watchlist from './Pages/Watchlist.jsx';
import Notes from './Pages/Notes.jsx';
import Settings from './Pages/Settings.jsx';
import Profile from './Pages/Profile.jsx';
import HelpCenter from './Pages/HelpCenter.jsx';
import Support from './Pages/Support.jsx';
import APIDocs from './Pages/APIDocs.jsx';
import About from './Pages/About.jsx';
import Careers from './Pages/Careers.jsx';
import ContactSupport from './Pages/ContactSupport.jsx';
import PressKit from './Pages/PressKit.jsx';
import Privacy from './Pages/Privacy.jsx';
import SystemStatus from './Pages/SystemStatus.jsx';
import Terms from './Pages/Terms.jsx';
import TradingGuides from './Pages/TradingGuides.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="spot" element={<Spot />} />
          <Route path="futures" element={<Futures />} />
          <Route path="margin" element={<Margin />} />
          <Route path="options" element={<Options />} />
          <Route path="nft" element={<NFT />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="psychology" element={<Psychology />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="notes" element={<Notes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="support" element={<Support />} />
          <Route path="api-docs" element={<APIDocs />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<ContactSupport />} />
          <Route path="press" element={<PressKit />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="status" element={<SystemStatus />} />
          <Route path="terms" element={<Terms />} />
          <Route path="guides" element={<TradingGuides />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;