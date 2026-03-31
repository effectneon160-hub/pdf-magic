import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor } from '../context/EditorContext';
import { Bold, Italic, Underline, Trash2, Copy, Type } from 'lucide-react';
import { toast } from 'sonner';
export const FormatBar = () => {
  const {
    currentDoc,
    currentPageId,
    selectedBlockId,
    updateBlock,
    deleteBlock,
    addBlock,
    copiedBlock,
    setCopiedBlock
  } = useEditor();
  if (!currentDoc || !currentPageId || !selectedBlockId) return null;
  const page = currentDoc.pages.find((p) => p.id === currentPageId);
  const block = page?.blocks.find((b) => b.id === selectedBlockId);
  if (!block || block.isOcr) return null; // Don't show for OCR blocks until they are converted
  const toggleStyle = (
  styleType: 'fontWeight' | 'fontStyle' | 'textDecoration') =>
  {
    if (styleType === 'fontWeight') {
      updateBlock(currentPageId, block.id, {
        fontWeight: block.fontWeight === 'bold' ? 'normal' : 'bold'
      });
    } else if (styleType === 'fontStyle') {
      updateBlock(currentPageId, block.id, {
        fontStyle: block.fontStyle === 'italic' ? 'normal' : 'italic'
      });
    } else if (styleType === 'textDecoration') {
      updateBlock(currentPageId, block.id, {
        textDecoration:
        block.textDecoration === 'underline' ? 'none' : 'underline'
      });
    }
  };
  const handleDuplicate = () => {
    const newBlock = {
      ...block,
      y: block.y + 20
    };
    addBlock(currentPageId, newBlock);
    toast.success('Block duplicated');
  };
  const colors = ['#000000', '#ef4444', '#3b82f6', '#22c55e', '#6b7280'];
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }}
        className="absolute z-50 bg-white shadow-xl border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2"
        style={{
          // Position it above the block. In a real app, we'd calculate exact DOM rects.
          // For prototype, we place it fixed near the top of the canvas or relative to the block.
          // Since this component is rendered inside EditorPage, we can make it fixed at the top center.
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
        
        <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
          <select
            value={block.fontFamily}
            onChange={(e) =>
            updateBlock(currentPageId, block.id, {
              fontFamily: e.target.value
            })
            }
            className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer outline-none w-28">
            
            <option value="Inter">Inter</option>
            <option value="Noto Sans Devanagari">Noto Sans (HI)</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier</option>
          </select>

          <input
            type="number"
            value={block.fontSize}
            onChange={(e) =>
            updateBlock(currentPageId, block.id, {
              fontSize: Number(e.target.value)
            })
            }
            className="w-12 text-sm border border-gray-200 rounded px-1 py-0.5 outline-none focus:border-primary"
            min="8"
            max="72" />
          
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 pr-2 pl-1">
          <button
            onClick={() => toggleStyle('fontWeight')}
            className={`p-1.5 rounded hover:bg-gray-100 ${block.fontWeight === 'bold' ? 'bg-gray-200' : ''}`}>
            
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleStyle('fontStyle')}
            className={`p-1.5 rounded hover:bg-gray-100 ${block.fontStyle === 'italic' ? 'bg-gray-200' : ''}`}>
            
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleStyle('textDecoration')}
            className={`p-1.5 rounded hover:bg-gray-100 ${block.textDecoration === 'underline' ? 'bg-gray-200' : ''}`}>
            
            <Underline className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 pr-2 pl-1">
          {colors.map((c) =>
          <button
            key={c}
            onClick={() =>
            updateBlock(currentPageId, block.id, {
              color: c
            })
            }
            className={`w-5 h-5 rounded-full border-2 ${block.color === c ? 'border-primary scale-110' : 'border-transparent hover:scale-110'} transition-transform`}
            style={{
              backgroundColor: c
            }} />

          )}
          <input
            type="color"
            value={block.color}
            onChange={(e) =>
            updateBlock(currentPageId, block.id, {
              color: e.target.value
            })
            }
            className="w-5 h-5 p-0 border-0 rounded cursor-pointer ml-1" />
          
        </div>

        <div className="flex items-center gap-1 pl-1">
          <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase mr-1">
            {block.language}
          </span>
          <button
            onClick={handleDuplicate}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
            title="Duplicate">
            
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteBlock(currentPageId, block.id)}
            className="p-1.5 rounded hover:bg-red-50 text-red-500"
            title="Delete">
            
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>);

};