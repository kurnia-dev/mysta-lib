import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar, { RouteConfig } from './Sidebar';

interface LayoutProps {
  routes: RouteConfig[];
}

const Layout: React.FC<LayoutProps> = ({ routes }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Sidebar
        className={`transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        routes={routes}
        onLinkClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <span className="text-xl font-bold">Mysta Lib</span>
        <button
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 p-4 md:ml-64 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
