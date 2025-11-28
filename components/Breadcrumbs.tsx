import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center text-base text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <button 
        onClick={() => onNavigate('/')}
        className="hover:text-brand-purple dark:hover:text-brand-green transition-colors flex items-center"
      >
        <Home size={18} className="mr-2" />
        Home
      </button>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="mx-3 text-slate-300" />
          {item.path ? (
            <button
              onClick={() => onNavigate(item.path!)}
              className="hover:text-brand-purple dark:hover:text-brand-green transition-colors font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};