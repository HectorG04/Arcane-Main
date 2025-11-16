
import React from 'react';
import type { Page, Theme } from '../App';
import { LogoutIcon, SunIcon, MoonIcon } from './Icons';
import Logo from './Logo';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onLogout, theme, toggleTheme }) => {
  const navButtonClasses = (page: Page) => 
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      currentPage === page
        ? 'bg-indigo-600 text-white shadow-inner'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="sticky top-0 z-40 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm flex justify-between items-center border-b border-slate-300/70 dark:border-gray-700/70">
      <Logo className="h-10" theme={theme} />
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-gray-900/50 rounded-lg">
          <button onClick={() => setCurrentPage('dashboard')} className={navButtonClasses('dashboard')}>
            Dashboard
          </button>
          <button onClick={() => setCurrentPage('board')} className={navButtonClasses('board')}>
            Board
          </button>
          <button onClick={() => setCurrentPage('discord')} className={navButtonClasses('discord')}>
            Discord IDs
          </button>
          <button onClick={() => setCurrentPage('financials')} className={navButtonClasses('financials')}>
            Financials
          </button>
          <button onClick={() => setCurrentPage('withdrawal')} className={navButtonClasses('withdrawal')}>
            Withdrawal
          </button>
          <button onClick={() => setCurrentPage('releasenotes')} className={navButtonClasses('releasenotes')}>
            Release Notes
          </button>
        </nav>
        <div className="flex items-center gap-2">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-sm font-medium transition-colors bg-slate-200/60 dark:bg-gray-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-gray-600"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg text-sm font-medium transition-colors bg-slate-200/60 dark:bg-gray-700 text-red-600 hover:bg-red-200 dark:hover:bg-red-500/20 dark:hover:text-red-500"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;