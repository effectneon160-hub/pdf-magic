import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useEditor } from '../context/EditorContext';
import { Navbar } from '../components/Navbar';
import { Toolbar } from '../components/Toolbar';
import { PageThumbnails } from '../components/PageThumbnails';
import { PDFCanvas } from '../components/PDFCanvas';
import { FormatBar } from '../components/FormatBar';
import { FindReplace } from '../components/FindReplace';
import { ZoomIn, ZoomOut, ChevronDown, CheckCircle2 } from 'lucide-react';
export const EditorPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    currentDoc,
    zoom,
    setZoom,
    documents,
    setCurrentDoc,
    setCurrentPageId,
    undo,
    redo,
    saveDocument,
    setShowFindReplace,
    selectedBlockId,
    currentPageId
  } = useEditor();
  useEffect(() => {
    if (!user) navigate('/auth');
    if (!currentDoc && documents.length > 0) {
      setCurrentDoc(documents[0]);
      setCurrentPageId(documents[0].pages[0].id);
    }
  }, [user, navigate, currentDoc, documents, setCurrentDoc, setCurrentPageId]);
  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            e.shiftKey ? redo() : undo();
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            saveDocument();
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, saveDocument]);
  if (!user) return null;
  const selectedBlock = currentDoc?.pages.
  find((p) => p.id === currentPageId)?.
  blocks.find((b) => b.id === selectedBlockId);
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Editor Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 hover:bg-gray-50 py-1 px-2 rounded">
              <span className="font-semibold text-gray-800">
                {currentDoc?.title || 'No document'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {documents.map((doc) =>
              <div
                key={doc.id}
                onClick={() => {
                  setCurrentDoc(doc);
                  setCurrentPageId(doc.pages[0].id);
                }}
                className="px-4 py-2 hover:bg-gray-50 text-sm cursor-pointer border-b border-gray-100 last:border-0">
                
                  {doc.title}
                </div>
              )}
            </div>
          </div>
          {currentDoc?.updatedAt &&
          <span className="text-xs text-gray-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Saved
            </span>
          }
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-colors">
            
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium w-12 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-colors">
            
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Editor Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <Toolbar />
        <PageThumbnails />
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <FormatBar />
          <FindReplace />
          <PDFCanvas />

          {/* Status Bar */}
          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-[11px] text-gray-500 z-20 shrink-0">
            
            <div className="flex items-center gap-4">
              <span>
                Page{' '}
                {currentDoc?.pages.findIndex((p) => p.id === currentPageId) !==
                undefined ?
                currentDoc!.pages.findIndex((p) => p.id === currentPageId) +
                1 :
                0}{' '}
                of {currentDoc?.pages.length || 0}
              </span>
              <span>{currentDoc?.wordCount || 0} words</span>
            </div>
            <div className="flex items-center gap-4">
              {selectedBlock &&
              <span>
                  Language:{' '}
                  {selectedBlock.language === 'en' ? 'English' : 'Hindi'}
                </span>
              }
              <span>Zoom: {zoom}%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

};