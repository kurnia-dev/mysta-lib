import React from 'react';
import { NavLink } from 'react-router-dom';

export interface RouteConfig {
  path: string;
  name: string;
}

interface SidebarProps {
  routes: RouteConfig[];
  className?: string;
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  className = 'hidden md:block',
  onLinkClick,
}) => {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-gray-50 p-4 transition-transform ${className}`}
    >
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
          M
        </div>
        <span className="text-xl font-bold text-gray-900">Mysta Lib</span>
      </div>

      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => (
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
              key={route.path}
              to={route.path}
              onClick={onLinkClick}
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
