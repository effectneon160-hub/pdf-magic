import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '../context/EditorContext';
import { TextBlock } from './TextBlock';
import { MessageSquare, X } from 'lucide-react';
export const PDFCanvas = () => {
  const {
    currentDoc,
    currentPageId,
    activeTool,
    zoom,
    addBlock,
    addAnnotation,
    setSelectedBlockId,
    showGrid,
    showRuler,
    showMargins
  } = useEditor();
  const canvasRef = useRef<HTMLDivElement>(null);
  if (!currentDoc || !currentPageId)
  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Select a document to view</p>
      </div>);

  const currentPage = currentDoc.pages.find((p) => p.id === currentPageId);
  if (!currentPage) return null;
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (
    e.target !== canvasRef.current &&
    e.target !== canvasRef.current?.firstChild)

    return;
    setSelectedBlockId(null);
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);
    if (activeTool === 'text') {
      addBlock(currentPageId, {
        content: 'New Text',
        x,
        y,
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#000000',
        fontWeight: 'normal',
        language: 'en'
      });
    } else if (activeTool === 'annotate') {
      const content = window.prompt('Enter your comment:');
      if (content) {
        addAnnotation(currentPageId, {
          content,
          x,
          y,
          color: '#fef08a',
          author: 'Current User'
        });
      }
    }
  };
  const PAGE_WIDTH = 800;
  const PAGE_HEIGHT = 1130;
  return (
    <div className="flex-1 bg-[#e5e7eb] overflow-auto flex justify-center p-8 relative">
      <div
        ref={canvasRef}
        className="bg-white shadow-page relative origin-top transition-transform duration-200"
        style={{
          width: `${PAGE_WIDTH}px`,
          height: `${PAGE_HEIGHT}px`,
          transform: `scale(${zoom / 100})`,
          cursor:
          activeTool === 'text' ?
          'text' :
          activeTool === 'annotate' ?
          'crosshair' :
          'default',
          // Paper texture
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
        onClick={handleCanvasClick}>
        
        {/* Grid Overlay */}
        {showGrid &&
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

        }

        {/* Margins */}
        {showMargins &&
        <div className="absolute inset-0 pointer-events-none border border-blue-300 border-dashed opacity-50 m-[50px]" />
        }

        {/* Ruler Top */}
        {showRuler &&
        <div className="absolute top-0 left-0 right-0 h-4 bg-gray-100 border-b border-gray-300 flex overflow-hidden pointer-events-none text-[8px] text-gray-500">
            {Array.from({
            length: Math.ceil(PAGE_WIDTH / 100)
          }).map((_, i) =>
          <div
            key={i}
            className="flex-none w-[100px] border-l border-gray-400 pl-1 pt-0.5">
            
                {i * 100}
              </div>
          )}
          </div>
        }

        {/* Ruler Left */}
        {showRuler &&
        <div className="absolute top-0 left-0 bottom-0 w-4 bg-gray-100 border-r border-gray-300 flex flex-col overflow-hidden pointer-events-none text-[8px] text-gray-500">
            {Array.from({
            length: Math.ceil(PAGE_HEIGHT / 100)
          }).map((_, i) =>
          <div
            key={i}
            className="flex-none h-[100px] border-t border-gray-400 pt-1 text-center"
            style={{
              writingMode: 'vertical-rl'
            }}>
            
                {i * 100}
              </div>
          )}
          </div>
        }

        {/* Scanned Image Background */}
        {currentPage.isScanned && currentPage.scannedImageUrl &&
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url('${currentPage.scannedImageUrl}')`,
            backgroundSize: 'cover',
            filter: 'contrast(1.2) sepia(0.2) brightness(0.95)',
            transform: 'rotate(-0.5deg) scale(1.01)' // Slight rotation for realism
          }} />

        }

        {/* Text Blocks */}
        {!currentPage.isScanned &&
        currentPage.blocks.map((block) =>
        <TextBlock key={block.id} block={block} pageId={currentPageId} />
        )}

        {/* Annotations */}
        {currentPage.annotations.map((ann) =>
        <motion.div
          key={ann.id}
          drag
          dragMomentum={false}
          className="absolute shadow-md rounded-br-xl rounded-tr-xl rounded-bl-xl p-3 w-48 text-xs z-20 cursor-move group"
          style={{
            left: ann.x,
            top: ann.y,
            backgroundColor: ann.color
          }}>
          
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1 font-bold text-gray-800">
                <MessageSquare className="w-3 h-3" />
                {ann.author}
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-600 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-gray-800">{ann.content}</p>
            <p className="text-[9px] text-gray-500 mt-2">
              {new Date(ann.createdAt).toLocaleTimeString()}
            </p>
          </motion.div>
        )}
      </div>
    </div>);

};