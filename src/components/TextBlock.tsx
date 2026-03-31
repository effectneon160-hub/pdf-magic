import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextBlock as TextBlockType } from '../data/mockData';
import { useEditor } from '../context/EditorContext';
interface Props {
  block: TextBlockType;
  pageId: string;
}
export const TextBlock = ({ block, pageId }: Props) => {
  const {
    activeTool,
    selectedBlockId,
    setSelectedBlockId,
    updateBlock,
    deleteBlock,
    highlightColor,
    copiedBlock,
    setCopiedBlock,
    addBlock
  } = useEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({
    x: 0,
    y: 0
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const isSelected = selectedBlockId === block.id;
  const isTextTool = activeTool === 'text';
  const isSelectTool = activeTool === 'select';
  const isHighlightTool = activeTool === 'highlight';
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [isEditing, content]);
  // Close context menu on outside click
  useEffect(() => {
    const closeMenu = () => setShowContextMenu(false);
    if (showContextMenu) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [showContextMenu]);
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelectTool || isTextTool) {
      setIsEditing(true);
      setSelectedBlockId(block.id);
    }
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHighlightTool) {
      updateBlock(pageId, block.id, {
        backgroundColor: highlightColor
      });
      return;
    }
    if (isSelectTool || isTextTool) {
      setSelectedBlockId(block.id);
    }
  };
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBlockId(block.id);
    setMenuPos({
      x: e.clientX,
      y: e.clientY
    });
    setShowContextMenu(true);
  };
  const handleBlur = () => {
    setIsEditing(false);
    if (content !== block.content) {
      updateBlock(pageId, block.id, {
        content
      });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setContent(block.content);
    }
  };
  const canDrag = isSelectTool && !isEditing;
  const ContextMenu = () =>
  <AnimatePresence>
      {showContextMenu &&
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0,
        scale: 0.95
      }}
      className="fixed z-[100] bg-white shadow-xl border border-gray-200 rounded-lg py-1 w-48 text-sm"
      style={{
        top: menuPos.y,
        left: menuPos.x
      }}
      onClick={(e) => e.stopPropagation()}>
      
          <button
        className="w-full text-left px-4 py-2 hover:bg-gray-50"
        onClick={() => {
          setCopiedBlock(block);
          setShowContextMenu(false);
        }}>
        
            Copy
          </button>
          <button
        className="w-full text-left px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        disabled={!copiedBlock}
        onClick={() => {
          if (copiedBlock)
          addBlock(pageId, {
            ...copiedBlock,
            x: block.x + 20,
            y: block.y + 20
          });
          setShowContextMenu(false);
        }}>
        
            Paste
          </button>
          <button
        className="w-full text-left px-4 py-2 hover:bg-gray-50"
        onClick={() => {
          addBlock(pageId, {
            ...block,
            x: block.x + 20,
            y: block.y + 20
          });
          setShowContextMenu(false);
        }}>
        
            Duplicate
          </button>
          <div className="h-px bg-gray-200 my-1"></div>
          <button
        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
        onClick={() => {
          deleteBlock(pageId, block.id);
          setShowContextMenu(false);
        }}>
        
            Delete
          </button>
        </motion.div>
    }
    </AnimatePresence>;

  return (
    <>
      <motion.div
        ref={blockRef}
        drag={canDrag}
        dragMomentum={false}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (canDrag) {
            updateBlock(pageId, block.id, {
              x: block.x + info.offset.x,
              y: block.y + info.offset.y
            });
          }
        }}
        initial={{
          x: block.x,
          y: block.y
        }}
        animate={{
          x: block.x,
          y: block.y
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={`absolute cursor-${canDrag ? 'move' : isHighlightTool ? 'pointer' : 'text'} 
          ${isSelected && !isEditing ? 'ring-1 ring-primary border border-dashed border-primary bg-primary/5' : ''}
          ${block.isOcr ? 'bg-green-100/30' : ''}
        `}
        style={{
          width: block.width ? `${block.width}px` : 'auto',
          minWidth: '20px',
          minHeight: '20px',
          zIndex: isSelected ? 10 : 1,
          backgroundColor: block.backgroundColor || 'transparent'
        }}>
        
        {/* Selection Handles */}
        {isSelected && !isEditing &&
        <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary"></div>
          </>
        }

        {isEditing ?
        <textarea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          className="bg-transparent outline-none resize-none overflow-hidden w-full h-full p-0 m-0"
          style={{
            fontSize: `${block.fontSize}px`,
            fontFamily: block.fontFamily,
            color: block.color,
            fontWeight: block.fontWeight,
            fontStyle: block.fontStyle || 'normal',
            textDecoration: block.textDecoration || 'none',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap'
          }} /> :


        <div
          className={`whitespace-pre-wrap ${block.language === 'hi' ? 'font-hindi' : ''}`}
          style={{
            fontSize: `${block.fontSize}px`,
            fontFamily: block.fontFamily,
            color: block.color,
            fontWeight: block.fontWeight,
            fontStyle: block.fontStyle || 'normal',
            textDecoration: block.textDecoration || 'none',
            lineHeight: 1.2
          }}>
          
            {block.content}
          </div>
        }

        {block.isOcr && isSelected && block.confidenceScore &&
        <div className="absolute -top-6 left-0 bg-green-100 text-green-800 text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap">
            OCR Confidence: {Math.round(block.confidenceScore * 100)}%
          </div>
        }
      </motion.div>
      <ContextMenu />
    </>);

};