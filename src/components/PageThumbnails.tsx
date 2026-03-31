import React from 'react';
import { useEditor } from '../context/EditorContext';
export const PageThumbnails = () => {
  const { currentDoc, currentPageId, setCurrentPageId } = useEditor();
  if (!currentDoc) return null;
  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto p-4 flex flex-col gap-4 shrink-0">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Pages
      </h3>
      {currentDoc.pages.map((page, index) =>
      <div
        key={page.id}
        onClick={() => setCurrentPageId(page.id)}
        className={`cursor-pointer flex flex-col items-center gap-2 group`}>
        
          <div
          className={`w-full aspect-[1/1.414] bg-white rounded shadow-sm border-2 transition-all ${currentPageId === page.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent group-hover:border-gray-300'} flex items-center justify-center overflow-hidden relative`}>
          
            {page.isScanned ?
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-[8px] text-center p-2">
                Scanned Image
              </div> :

          <div className="text-[8px] text-gray-300">Text Page</div>
          }
            <div className="absolute bottom-1 right-1 bg-black/40 text-white text-[8px] px-1 rounded">
              {index + 1}
            </div>
          </div>
          <span className="text-xs text-gray-600 font-medium">{index + 1}</span>
        </div>
      )}
    </div>);

};