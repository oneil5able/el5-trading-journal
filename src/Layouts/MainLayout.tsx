import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Eye,
  Briefcase,
  BarChart3,
  Calculator,
  Brain,
  StickyNote,
  Settings,
  User,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/common/ThemeToggle";
import { cn, createPageUrl } from "@/lib/utils";

/* ----------------------------------------
   Types
---------------------------------------- */

type NavItem = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  page: string;
};

/**
 * IMPORTANT:
 * `page` values MUST match route paths exactly
 */

/* ----------------------------------------
   Navigation Config
---------------------------------------- */

const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { name: "Journal", icon: BookOpen, page: "journal" },
  { name: "Charts", icon: TrendingUp, page: "chart" },
  { name: "Watchlist", icon: Eye, page: "watchlist" },
  { name: "Portfolio", icon: Briefcase, page: "portfolio" },
  { name: "Analytics", icon: BarChart3, page: "analytics" },
  { name: "Calculator", icon: Calculator, page: "calculator" },
  { name: "Spot", icon: BarChart3, page: "spot" },
  { name: "Futures", icon: BarChart3, page: "futures" },
  { name: "Options", icon: BarChart3, page: "options" },
  { name: "Margin", icon: BarChart3, page: "margin" },
  { name: "NFT", icon: BarChart3, page: "nft" },
];

const bottomNavItems: NavItem[] = [
  { name: "Psychology", icon: Brain, page: "psychology" },
  { name: "Notes", icon: StickyNote, page: "notes" },
  { name: "Profile", icon: User, page: "profile" },
  { name: "Settings", icon: Settings, page: "settings" },
  { name: "Support", icon: BookOpen, page: "support" },
  { name: "Help Center", icon: BookOpen, page: "help" },
  { name: "API Docs", icon: BookOpen, page: "api-docs" },
  { name: "About", icon: User, page: "about" },
  { name: "Careers", icon: Briefcase, page: "careers" },
  { name: "Privacy", icon: BookOpen, page: "privacy" },
  { name: "Terms", icon: BookOpen, page: "terms" },
];

/* ----------------------------------------
   Layout
---------------------------------------- */

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavItem = (item: NavItem) => (
    <NavLink
      key={item.page}
      to={createPageUrl(item.page)}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
          isActive
            ? "bg-emerald-500/10 text-emerald-400"
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        )
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      <span className="font-medium">{item.name}</span>
    </NavLink>
  );

  return (
    <div
      className={cn(
        "min-h-screen bg-slate-950",
        mobileMenuOpen && "overflow-hidden"
      )}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-xl flex-col z-50">
        <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-white block">
                EL TRADING
              </span>
              <span className="text-xs text-slate-400">JOURNAL</span>
            </div>
          </NavLink>
          <ThemeToggle />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(renderNavItem)}
        </nav>

        <div className="p-4 border-t border-slate-800/50 space-y-1">
          {bottomNavItems.map(renderNavItem)}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-16 bg-slate-900/90 border-b border-slate-800/50 backdrop-blur-xl flex items-center justify-between px-4 z-50">
        <NavLink to="/" className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-lg font-bold text-white">EL</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-slate-950/95 z-40 p-4 space-y-1 overflow-y-auto">
          {[...navItems, ...bottomNavItems].map(renderNavItem)}
        </div>
      )}

      {/* Page Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
