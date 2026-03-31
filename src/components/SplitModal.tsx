import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useEditor } from '../context/EditorContext';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const SplitModal = ({ isOpen, onClose }: Props) => {
  const { currentDoc } = useEditor();
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = useState('');
  if (!isOpen || !currentDoc) return null;
  const togglePage = (pageNum: number) => {
    const newSet = new Set(selectedPages);
    if (newSet.has(pageNum)) newSet.delete(pageNum);else
    newSet.add(pageNum);
    setSelectedPages(newSet);
    setRangeInput(
      Array.from(newSet).
      sort((a, b) => a - b).
      join(', ')
    );
  };
  const handleSplit = () => {
    if (selectedPages.size === 0) {
      toast.error('Please select at least one page');
      return;
    }
    toast.success(`Extracted ${selectedPages.size} pages successfully!`);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      
      <AnimatePresence>
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          exit={{
            scale: 0.95,
            opacity: 0
          }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}>
          
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
              <h3 className="font-semibold text-lg">Extract Pages</h3>
              <p className="text-xs text-gray-500">
                Select pages to split into a new document
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-100 flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Page Range:
            </label>
            <input
              type="text"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              placeholder="e.g. 1, 3-5"
              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
            
            <span className="text-sm text-primary font-medium bg-primary-50 px-3 py-1.5 rounded-md">
              {selectedPages.size} selected
            </span>
          </div>

          <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {currentDoc.pages.map((page, idx) => {
                const pageNum = idx + 1;
                const isSelected = selectedPages.has(pageNum);
                return (
                  <div
                    key={page.id}
                    onClick={() => togglePage(pageNum)}
                    className={`relative aspect-[1/1.414] bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all group ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'}`}>
                    
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">
                      Page {pageNum}
                    </div>

                    <div
                      className={`absolute top-2 left-2 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white text-transparent group-hover:border-gray-400'}`}>
                      
                      <Check className="w-3 h-3" />
                    </div>
                  </div>);

              })}
            </div>
          </div>

          <div className="p-4 bg-white flex justify-end gap-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              
              Cancel
            </button>
            <button
              onClick={handleSplit}
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-800 transition-colors shadow-sm">
              
              Extract Pages
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

};