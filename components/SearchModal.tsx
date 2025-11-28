import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FileCode, ChevronRight } from 'lucide-react';
import { TECH_STACK_DATA } from '../constants';
import { SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: string, tech: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        setQuery('');
    }
  }, [isOpen]);

  // Global search logic
  const results: SearchResult[] = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const matches: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(TECH_STACK_DATA).forEach(([category, techs]) => {
      Object.entries(techs).forEach(([techName, details]) => {
        // Search Tech Name
        if (techName.toLowerCase().includes(lowerQuery)) {
          matches.push({ category, techName, matchField: 'Technology', matchValue: techName });
        }
        
        // Search Details
        Object.entries(details).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.forEach(val => {
              if (val.toLowerCase().includes(lowerQuery)) {
                matches.push({ 
                  category, 
                  techName, 
                  matchField: key.replace(/([A-Z])/g, ' $1').trim(), 
                  matchValue: val 
                });
              }
            });
          }
        });
      });
    });
    return matches.slice(0, 20); // Limit results
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[70vh]">
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 p-5">
          <Search className="text-slate-400 w-6 h-6 mr-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search technologies, files, variables..."
            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="text-slate-400 w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-2">
            {query.length > 0 && results.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-lg">
                    No results found for "{query}"
                </div>
            )}
            
            {results.map((res, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                        onNavigate(res.category, res.techName);
                        onClose();
                    }}
                    className="w-full text-left flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg group transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0"
                >
                    <div className="p-3 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-lg mr-5 text-brand-purple">
                        <FileCode size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-slate-900 dark:text-white">{res.techName}</span>
                            <span className="text-sm px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                {res.category}
                            </span>
                        </div>
                        <div className="text-base text-slate-500 dark:text-slate-400 truncate mt-1">
                            <span className="font-medium text-brand-purple/80">{res.matchField}:</span> {res.matchValue}
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-green transition-colors opacity-0 group-hover:opacity-100" />
                </button>
            ))}

            {!query && (
                <div className="p-10 text-center text-slate-400">
                    <p className="text-base">Start typing to search across all stacks...</p>
                </div>
            )}
        </div>
        
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-sm text-center text-slate-400">
            Press ESC to close
        </div>
      </div>
    </div>
  );
};