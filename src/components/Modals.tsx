import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { useEditor } from '../context/EditorContext';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalOverlay = ({
  children,
  onClose



}: {children: React.ReactNode;onClose: () => void;}) =>
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
      className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
      onClick={(e) => e.stopPropagation()}>
      
        {children}
      </motion.div>
    </AnimatePresence>
  </div>;

export const MergeModal = ({ isOpen, onClose }: ModalProps) => {
  const { documents } = useEditor();
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  if (!isOpen) return null;
  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
    prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-lg">Merge PDFs</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 max-h-64 overflow-y-auto">
        <p className="text-sm text-gray-600 mb-3">Select documents to merge:</p>
        <div className="space-y-2">
          {documents.map((doc) =>
          <div
            key={doc.id}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedDocs.includes(doc.id) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => toggleDoc(doc.id)}>
            
              <input
              type="checkbox"
              checked={selectedDocs.includes(doc.id)}
              readOnly
              className="mt-0.5" />
            
              <FileText className="w-5 h-5 text-gray-400" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {doc.title}
                </p>
                <p className="text-xs text-gray-500">
                  {doc.pages.length} pages
                </p>
              </div>
              <GripVertical className="w-4 h-4 text-gray-300" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md">
          
          Cancel
        </button>
        <button
          onClick={() => {
            toast.success(`Merged ${selectedDocs.length} files successfully`);
            onClose();
          }}
          disabled={selectedDocs.length < 2}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-800 disabled:opacity-50">
          
          Merge Files
        </button>
      </div>
    </ModalOverlay>);

};
export const CompressModal = ({ isOpen, onClose }: ModalProps) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  if (!isOpen) return null;
  const handleCompress = () => {
    setIsCompressing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          toast.success('PDF compressed successfully! Size reduced by 45%');
          setIsCompressing(false);
          setProgress(0);
          onClose();
        }, 500);
      }
    }, 200);
  };
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-lg">Compress PDF</h3>
        <button
          onClick={onClose}
          disabled={isCompressing}
          className="text-gray-400 hover:text-gray-600">
          
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        {isCompressing ?
        <div className="py-8 text-center">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Compressing document...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
              className="bg-primary h-2.5 rounded-full"
              initial={{
                width: 0
              }}
              animate={{
                width: `${progress}%`
              }} />
            
            </div>
            <p className="text-xs text-gray-500 mt-2">{progress}%</p>
          </div> :

        <>
            <label className="flex items-start gap-3 p-3 border border-primary bg-primary-50 rounded-lg cursor-pointer">
              <input
              type="radio"
              name="compression"
              className="mt-1"
              defaultChecked />
            
              <div>
                <p className="font-medium text-primary-900">
                  Recommended Compression
                </p>
                <p className="text-xs text-primary-700">
                  Good quality, smaller file size
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="compression" className="mt-1" />
              <div>
                <p className="font-medium text-gray-900">Extreme Compression</p>
                <p className="text-xs text-gray-500">
                  Lower quality, smallest file size
                </p>
              </div>
            </label>
          </>
        }
      </div>
      {!isCompressing &&
      <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md">
          
            Cancel
          </button>
          <button
          onClick={handleCompress}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-800">
          
            Compress
          </button>
        </div>
      }
    </ModalOverlay>);

};