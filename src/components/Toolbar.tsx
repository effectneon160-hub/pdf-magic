import React, { useState } from 'react';
import { useEditor, Tool } from '../context/EditorContext';
import {
  MousePointer2,
  Type,
  ScanText,
  Highlighter,
  MessageSquare,
  PenTool,
  Combine,
  SplitSquareHorizontal,
  Minimize,
  Download,
  Save,
  Undo2,
  Redo2,
  Search,
  Grid,
  Ruler } from
'lucide-react';
import { SignatureModal } from './SignatureModal';
import { SplitModal } from './SplitModal';
import { MergeModal, CompressModal } from './Modals';
import { toast } from 'sonner';
export const Toolbar = () => {
  const {
    activeTool,
    setActiveTool,
    currentDoc,
    currentPageId,
    runOcr,
    saveDocument,
    undo,
    redo,
    canUndo,
    canRedo,
    setShowFindReplace,
    showGrid,
    setShowGrid,
    showRuler,
    setShowRuler,
    highlightColor,
    setHighlightColor
  } = useEditor();
  const [modals, setModals] = useState({
    sign: false,
    merge: false,
    split: false,
    compress: false
  });
  const currentPage = currentDoc?.pages.find((p) => p.id === currentPageId);
  const isScanned = currentPage?.isScanned;
  const handleToolClick = (tool: Tool) => {
    if (tool === 'ocr') {
      if (!currentPageId) return;
      if (!isScanned) {
        toast.info('This page is already editable text.');
        return;
      }
      runOcr(currentPageId);
    } else if (tool === 'sign') {
      setModals((m) => ({
        ...m,
        sign: true
      }));
    } else {
      setActiveTool(tool);
    }
  };
  const ToolButton = ({
    tool,
    icon: Icon,
    label,
    disabled = false,
    onClick,
    active
  }: any) => {
    const isActive = active !== undefined ? active : activeTool === tool;
    return (
      <div className="relative group w-full">
        <button
          onClick={onClick || (() => handleToolClick(tool as Tool))}
          disabled={disabled}
          className={`w-full flex flex-col items-center justify-center p-2.5 gap-1 rounded-xl transition-all ${disabled ? 'opacity-40 cursor-not-allowed text-gray-400' : isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-primary-50 hover:text-primary'}`}>
          
          <Icon className="w-5 h-5" />
          <span className="text-[9px] font-medium">{label}</span>
        </button>
        {/* Tooltip */}
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
          {label}
        </div>
      </div>);

  };
  const Separator = ({ label }: {label: string;}) =>
  <div className="w-full flex flex-col items-center my-2">
      <div className="w-8 h-px bg-gray-200 mb-1"></div>
      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>;

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-1 h-full overflow-y-auto shrink-0 z-10 shadow-sm custom-scrollbar">
      <div className="flex w-full px-2 gap-1 mb-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex-1 p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600 flex justify-center">
          
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="flex-1 p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600 flex justify-center">
          
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <Separator label="Edit" />
      <div className="w-full px-2 space-y-1">
        <ToolButton tool="select" icon={MousePointer2} label="Select" />
        <ToolButton tool="text" icon={Type} label="Text" />
        <div className="relative group w-full">
          <ToolButton tool="highlight" icon={Highlighter} label="Highlight" />
          {activeTool === 'highlight' &&
          <div className="absolute left-full ml-2 top-0 bg-white shadow-lg border border-gray-200 rounded p-1 flex flex-col gap-1 z-50">
              {['#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8'].map((c) =>
            <button
              key={c}
              onClick={() => setHighlightColor(c)}
              className={`w-5 h-5 rounded-full border-2 ${highlightColor === c ? 'border-primary' : 'border-transparent'}`}
              style={{
                backgroundColor: c
              }} />

            )}
            </div>
          }
        </div>
        <ToolButton tool="annotate" icon={MessageSquare} label="Comment" />
        <ToolButton tool="sign" icon={PenTool} label="Sign" />
      </div>

      <Separator label="Tools" />
      <div className="w-full px-2 space-y-1">
        <ToolButton
          tool="ocr"
          icon={ScanText}
          label="OCR"
          disabled={!isScanned} />
        
        <ToolButton
          tool="search"
          icon={Search}
          label="Find"
          active={false}
          onClick={() => setShowFindReplace(true)} />
        
        <ToolButton
          tool="grid"
          icon={Grid}
          label="Grid"
          active={showGrid}
          onClick={() => setShowGrid(!showGrid)} />
        
        <ToolButton
          tool="ruler"
          icon={Ruler}
          label="Ruler"
          active={showRuler}
          onClick={() => setShowRuler(!showRuler)} />
        
      </div>

      <Separator label="File" />
      <div className="w-full px-2 space-y-1">
        <ToolButton
          tool="merge"
          icon={Combine}
          label="Merge"
          active={false}
          onClick={() =>
          setModals((m) => ({
            ...m,
            merge: true
          }))
          } />
        
        <ToolButton
          tool="split"
          icon={SplitSquareHorizontal}
          label="Split"
          active={false}
          onClick={() =>
          setModals((m) => ({
            ...m,
            split: true
          }))
          } />
        
        <ToolButton
          tool="compress"
          icon={Minimize}
          label="Compress"
          active={false}
          onClick={() =>
          setModals((m) => ({
            ...m,
            compress: true
          }))
          } />
        
      </div>

      <div className="mt-auto w-full px-2 space-y-1 pt-4 border-t border-gray-100">
        <ToolButton
          tool="save"
          icon={Save}
          label="Save"
          active={false}
          onClick={saveDocument} />
        
        <ToolButton
          tool="download"
          icon={Download}
          label="Export"
          active={false}
          onClick={() => {
            toast.success('Downloading PDF...');
            setTimeout(() => toast.success('Download complete!'), 1500);
          }} />
        
      </div>

      <SignatureModal
        isOpen={modals.sign}
        onClose={() =>
        setModals((m) => ({
          ...m,
          sign: false
        }))
        } />
      
      <SplitModal
        isOpen={modals.split}
        onClose={() =>
        setModals((m) => ({
          ...m,
          split: false
        }))
        } />
      
      <MergeModal
        isOpen={modals.merge}
        onClose={() =>
        setModals((m) => ({
          ...m,
          merge: false
        }))
        } />
      
      <CompressModal
        isOpen={modals.compress}
        onClose={() =>
        setModals((m) => ({
          ...m,
          compress: false
        }))
        } />
      
    </div>);

};