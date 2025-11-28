import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Search, 
  Moon, 
  Sun, 
  Database, 
  Server, 
  Layers, 
  Code, 
  Box, 
  Terminal, 
  ExternalLink, 
  Copy,
  Check,
  Download,
  ArrowLeft
} from 'lucide-react';
import { TECH_STACK_DATA } from './constants';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SearchModal } from './components/SearchModal';
import { TechDetails } from './types';

// --- Utilities ---
const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('database')) return <Database className="w-7 h-7" />;
  if (lower.includes('server')) return <Server className="w-7 h-7" />;
  if (lower.includes('framework')) return <Layers className="w-7 h-7" />;
  if (lower.includes('app')) return <Box className="w-7 h-7" />;
  if (lower.includes('other')) return <Terminal className="w-7 h-7" />;
  return <Code className="w-7 h-7" />;
};

const formatKey = (key: string) => key.replace(/([A-Z])/g, ' $1').trim();

// --- Components (Inline for Simplicity in Single File Output Structure where applicable, but organized) ---

const Footer = () => (
  <footer className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-base text-slate-500">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <span className="font-bold text-brand-purple">TechStack Lens</span>
        <span>v1.0.0 (POC)</span>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-brand-green transition-colors">Data Source</a>
        <a href="#" className="hover:text-brand-green transition-colors">About</a>
        <a href="#" className="hover:text-brand-green transition-colors">Github</a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in">
      <div className="text-center py-24 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green">Tech Artifacts</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
          A comprehensive reference for configuration files, exposed endpoints, environment variables, and vulnerabilities across modern technology stacks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {Object.keys(TECH_STACK_DATA).map((category) => (
          <div 
            key={category}
            onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
            className="group relative bg-white dark:bg-brand-card rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-800"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-transform text-brand-purple">
               {getCategoryIcon(category)}
            </div>
            <div className="inline-flex p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-brand-purple mb-4 group-hover:bg-brand-purple group-hover:text-white transition-colors">
              {getCategoryIcon(category)}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{category}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              {Object.keys(TECH_STACK_DATA[category]).length} technologies listed
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
                {Object.keys(TECH_STACK_DATA[category]).slice(0, 3).map(tech => (
                    <span key={tech} className="text-sm px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                        {tech}
                    </span>
                ))}
                {Object.keys(TECH_STACK_DATA[category]).length > 3 && (
                    <span className="text-sm px-2.5 py-1 text-slate-400">+ more</span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const categoryName = decodeURIComponent(id || '');
  const data = TECH_STACK_DATA[categoryName];

  if (!data) return <div className="text-center py-20 text-red-500 text-xl">Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
      <Breadcrumbs items={[{ label: categoryName }]} onNavigate={p => navigate(p)} />
      
      <div className="flex items-center gap-5 mb-10">
        <div className="p-4 bg-brand-purple/10 rounded-xl text-brand-purple">
            {getCategoryIcon(categoryName)}
        </div>
        <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{categoryName}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Select a technology to view detailed artifacts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(data).map((techName) => (
          <div 
            key={techName}
            onClick={() => navigate(`/category/${encodeURIComponent(categoryName)}/tech/${encodeURIComponent(techName)}`)}
            className="bg-white dark:bg-brand-card p-7 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-purple/50 hover:ring-2 hover:ring-brand-purple/20 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">{techName}</h3>
                <ExternalLink size={20} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Includes</div>
                <div className="flex flex-wrap gap-2">
                     {/* Show tags for what data is available */}
                     {Object.keys(data[techName]).slice(0, 4).map(key => (
                         <span key={key} className="text-sm px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700">
                             {formatKey(key)}
                         </span>
                     ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(items.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-brand-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-3 shadow-sm">
            <div 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center justify-between p-5 cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
                <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    {title}
                    <span className="text-sm font-normal px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {items.length}
                    </span>
                </h3>
                <div className="flex items-center gap-3">
                     <button 
                        onClick={handleCopy}
                        className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-brand-green transition-all"
                        title="Copy list"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                     </button>
                     <div className={`transform transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}>
                         <ArrowLeft size={18} className="-rotate-90 text-slate-400" />
                     </div>
                </div>
            </div>
            
            {!isCollapsed && (
                <div className="p-5 bg-white dark:bg-brand-card border-t border-slate-100 dark:border-slate-800">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 text-base font-mono text-slate-600 dark:text-slate-300 break-all">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TechDetailPage = () => {
    const { id, techId } = useParams<{ id: string, techId: string }>();
    const navigate = useNavigate();
    const categoryName = decodeURIComponent(id || '');
    const techName = decodeURIComponent(techId || '');
    
    // Safety check
    const categoryData = TECH_STACK_DATA[categoryName];
    const techData = categoryData ? categoryData[techName] : null;

    if (!techData) return <div className="text-center py-20 text-red-500 text-xl">Technology not found</div>;

    const downloadJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(techData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${techName.toLowerCase().replace(/\s/g, '_')}_stack.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
             <Breadcrumbs 
                items={[{ label: categoryName, path: `/category/${encodeURIComponent(categoryName)}` }, { label: techName }]} 
                onNavigate={p => navigate(p)} 
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center text-white shadow-lg">
                        <span className="text-3xl font-bold">{techName.substring(0, 2).toUpperCase()}</span>
                     </div>
                     <div>
                         <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{techName}</h1>
                         <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mt-1">{categoryName}</p>
                     </div>
                </div>
                
                <button 
                    onClick={downloadJson}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg text-lg"
                >
                    <Download size={20} />
                    Export JSON
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-2">
                    {Object.entries(techData).map(([key, value]) => {
                        if (Array.isArray(value) && value.length > 0) {
                            return <DetailSection key={key} title={formatKey(key)} items={value} />
                        }
                        return null;
                    })}
                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/10 rounded-xl p-8">
                            <h4 className="font-bold text-brand-purple mb-5 text-xl">Quick Stats</h4>
                            <div className="space-y-5">
                                {Object.entries(techData).map(([key, value]) => (
                                    Array.isArray(value) && (
                                        <div key={key} className="flex justify-between items-center text-base">
                                            <span className="text-slate-600 dark:text-slate-400">{formatKey(key)}</span>
                                            <span className="font-mono font-bold text-slate-900 dark:text-white text-lg">{value.length}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-brand-purple to-indigo-600 rounded-xl p-8 text-white shadow-xl">
                            <h4 className="font-bold mb-3 text-lg">Did you know?</h4>
                            <p className="text-white/90 text-base leading-relaxed">
                                Understanding the directory structure and default configuration files of {techName} is crucial for both security auditing and operational maintenance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Layout & App ---

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-medium">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-brand-purple rounded-lg flex items-center justify-center text-white">
                <Layers size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight hidden sm:block text-slate-900 dark:text-white">
              TechStack<span className="text-brand-green">Lens</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors w-full sm:w-80"
            >
              <Search size={18} />
              <span className="text-base truncate">Search technologies...</span>
              <div className="hidden sm:flex ml-auto text-xs bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-semibold">Ctrl K</div>
            </button>

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(cat, tech) => navigate(`/category/${encodeURIComponent(cat)}/tech/${encodeURIComponent(tech)}`)}
      />
    </div>
  );
};

const App: React.FC = () => {
    // Basic key listener for search shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // We can't easily toggle state deep in Layout from here without context, 
                // but usually one would use a Context Provider. 
                // For this POC, we rely on the click handler in Layout.
                const searchBtn = document.querySelector('header button span.truncate')?.parentElement;
                if (searchBtn instanceof HTMLElement) searchBtn.click();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/category/:id/tech/:techId" element={<TechDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;