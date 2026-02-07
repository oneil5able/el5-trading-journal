import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";

// pages
import Dashboard from "@/pages/Dashboard";
import Journal from "@/pages/Journal";
import Portfolio from "@/pages/portfolio";
import Spot from "@/pages/Spot";
import Futures from "@/pages/Futures";
import Margin from "@/pages/Margin";
import Options from "@/pages/Options";
import NFT from "@/pages/NFT";
import Calculator from "@/pages/Calculator";
import Analytics from "@/pages/Analytics";
import Psychology from "@/pages/Psychology";
import Watchlist from "@/pages/Watchlist";
import Notes from "@/pages/Notes";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import HelpCenter from "@/pages/HelpCenter";
import Support from "@/pages/Support";
import APIDocs from "@/pages/APIDocs";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import ContactSupport from "@/pages/ContactSupport";
import PressKit from "@/pages/PressKit";
import Privacy from "@/pages/Privacy";
import SystemStatus from "@/pages/SystemStatus";
import Terms from "@/pages/Terms";
import TradingGuides from "@/pages/TradingGuides";
import Chart from "@/pages/Chart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "journal", element: <Journal /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "spot", element: <Spot /> },
      { path: "futures", element: <Futures /> },
      { path: "margin", element: <Margin /> },
      { path: "options", element: <Options /> },
      { path: "nft", element: <NFT /> },
      { path: "calculator", element: <Calculator /> },
      { path: "analytics", element: <Analytics /> },
      { path: "psychology", element: <Psychology /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "notes", element: <Notes /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "help", element: <HelpCenter /> },
      { path: "support", element: <Support /> },
      { path: "api-docs", element: <APIDocs /> },
      { path: "about", element: <About /> },
      { path: "careers", element: <Careers /> },
      { path: "contact", element: <ContactSupport /> },
      { path: "press", element: <PressKit /> },
      { path: "privacy", element: <Privacy /> },
      { path: "status", element: <SystemStatus /> },
      { path: "terms", element: <Terms /> },
      { path: "guides", element: <TradingGuides /> },
      { path: "charts", element: <Chart /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
