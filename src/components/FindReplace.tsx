import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor } from '../context/EditorContext';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';
export const FindReplace = () => {
  const {
    showFindReplace,
    setShowFindReplace,
    searchQuery,
    setSearchQuery,
    replaceQuery,
    setReplaceQuery,
    searchResults,
    currentSearchIndex,
    nextSearchResult,
    prevSearchResult,
    replaceCurrent,
    replaceAll
  } = useEditor();
  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFindReplace(true);
      }
      if (e.key === 'Escape' && showFindReplace) {
        setShowFindReplace(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFindReplace, setShowFindReplace]);
  if (!showFindReplace) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          y: -50,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        exit={{
          y: -50,
          opacity: 0
        }}
        className="absolute top-4 right-4 z-50 bg-white shadow-xl border border-gray-200 rounded-xl w-80 overflow-hidden">
        
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Search className="w-4 h-4" /> Find & Replace
          </div>
          <button
            onClick={() => setShowFindReplace(false)}
            className="text-gray-400 hover:text-gray-600">
            
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Find..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-20 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              autoFocus />
            
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-xs text-gray-400 mr-1">
                {searchResults.length > 0 ?
                `${currentSearchIndex + 1}/${searchResults.length}` :
                '0/0'}
              </span>
              <button
                onClick={prevSearchResult}
                className="p-1 hover:bg-gray-100 rounded text-gray-500">
                
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={nextSearchResult}
                className="p-1 hover:bg-gray-100 rounded text-gray-500">
                
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Replace with..."
            value={replaceQuery}
            onChange={(e) => setReplaceQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
          

          <div className="flex gap-2 pt-1">
            <button
              onClick={replaceCurrent}
              disabled={searchResults.length === 0}
              className="flex-1 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50">
              
              Replace
            </button>
            <button
              onClick={replaceAll}
              disabled={searchResults.length === 0}
              className="flex-1 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-md hover:bg-primary-800 disabled:opacity-50">
              
              Replace All
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>);

};