import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Eraser } from 'lucide-react';
import { toast } from 'sonner';
import { useEditor } from '../context/EditorContext';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const SignatureModal = ({ isOpen, onClose }: Props) => {
  const { addBlock, currentPageId } = useEditor();
  const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload'>('draw');
  const [signatureText, setSignatureText] = useState('');
  const [fontStyle, setFontStyle] = useState('font-serif italic');
  const [color, setColor] = useState('#000080');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    if (isOpen && activeTab === 'draw' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
      }
    }
  }, [isOpen, activeTab, color]);
  if (!isOpen) return null;
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  const handleAdd = () => {
    if (!currentPageId) return;
    if (activeTab === 'type' && signatureText.trim()) {
      addBlock(currentPageId, {
        content: signatureText,
        x: 100,
        y: 100,
        fontSize: 32,
        fontFamily: fontStyle.includes('serif') ? 'Georgia' : 'Inter',
        fontStyle: fontStyle.includes('italic') ? 'italic' : 'normal',
        color: color,
        fontWeight: 'normal',
        language: 'en'
      });
      toast.success('Signature added');
      onClose();
    } else if (activeTab === 'draw') {
      toast.success('Drawn signature added (Mocked as text block)');
      addBlock(currentPageId, {
        content: '[Drawn Signature]',
        x: 100,
        y: 100,
        fontSize: 24,
        fontFamily: 'Inter',
        fontStyle: 'italic',
        color: color,
        fontWeight: 'bold',
        language: 'en'
      });
      onClose();
    } else if (activeTab === 'upload') {
      toast.success('Uploaded signature added (Mocked)');
      onClose();
    }
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
          className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}>
          
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-lg">Add Signature</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-gray-200">
            {['draw', 'type', 'upload'].map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              
                {tab}
              </button>
            )}
          </div>

          <div className="p-6">
            {activeTab === 'draw' &&
            <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative">
                  <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  className="w-full h-[200px] cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing} />
                
                  <button
                  onClick={clearCanvas}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded shadow text-gray-500 hover:text-red-500"
                  title="Clear">
                  
                    <Eraser className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center gap-3">
                  {['#000000', '#000080', '#ef4444'].map((c) =>
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-primary scale-110' : 'border-transparent'}`}
                  style={{
                    backgroundColor: c
                  }} />

                )}
                </div>
              </div>
            }

            {activeTab === 'type' &&
            <div className="space-y-4">
                <input
                type="text"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                className={`w-full border border-gray-300 rounded-md p-4 text-3xl focus:ring-2 focus:ring-primary focus:border-primary outline-none ${fontStyle}`}
                style={{
                  color
                }}
                placeholder="John Doe"
                autoFocus />
              
                <div className="flex gap-2">
                  <button
                  onClick={() => setFontStyle('font-serif italic')}
                  className={`flex-1 py-2 border rounded ${fontStyle.includes('serif') ? 'border-primary bg-primary/5' : 'border-gray-200'} font-serif italic`}>
                  
                    Style 1
                  </button>
                  <button
                  onClick={() => setFontStyle('font-sans font-bold')}
                  className={`flex-1 py-2 border rounded ${fontStyle.includes('sans') ? 'border-primary bg-primary/5' : 'border-gray-200'} font-sans font-bold`}>
                  
                    Style 2
                  </button>
                </div>
              </div>
            }

            {activeTab === 'upload' &&
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Click or drag image to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
              </div>
            }
          </div>

          <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
              
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-800 transition-colors shadow-sm">
              
              Add Signature
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

};