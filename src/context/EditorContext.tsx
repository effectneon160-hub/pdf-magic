import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext } from
'react';
import {
  Document,
  Page,
  TextBlock,
  Annotation,
  mockDocuments } from
'../data/mockData';
import { toast } from 'sonner';
export type Tool = 'select' | 'text' | 'ocr' | 'highlight' | 'annotate' | 'sign';
interface SearchResult {
  pageId: string;
  blockId: string;
  index: number;
}
interface EditorContextType {
  documents: Document[];
  currentDoc: Document | null;
  currentPageId: string | null;
  activeTool: Tool;
  zoom: number;
  selectedBlockId: string | null;
  // Undo/Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  // Find & Replace
  searchQuery: string;
  replaceQuery: string;
  searchResults: SearchResult[];
  currentSearchIndex: number;
  showFindReplace: boolean;
  setSearchQuery: (q: string) => void;
  setReplaceQuery: (q: string) => void;
  setShowFindReplace: (show: boolean) => void;
  nextSearchResult: () => void;
  prevSearchResult: () => void;
  replaceCurrent: () => void;
  replaceAll: () => void;
  // Clipboard & Formatting
  copiedBlock: TextBlock | null;
  setCopiedBlock: (block: TextBlock | null) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  // Canvas Toggles
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  showRuler: boolean;
  setShowRuler: (show: boolean) => void;
  showMargins: boolean;
  setShowMargins: (show: boolean) => void;
  setCurrentDoc: (doc: Document | null) => void;
  setCurrentPageId: (id: string | null) => void;
  setActiveTool: (tool: Tool) => void;
  setZoom: (zoom: number) => void;
  setSelectedBlockId: (id: string | null) => void;
  updateBlock: (
  pageId: string,
  blockId: string,
  updates: Partial<TextBlock>)
  => void;
  addBlock: (pageId: string, block: Omit<TextBlock, 'id'>) => void;
  deleteBlock: (pageId: string, blockId: string) => void;
  runOcr: (pageId: string) => Promise<void>;
  addAnnotation: (
  pageId: string,
  annotation: Omit<Annotation, 'id' | 'createdAt'>)
  => void;
  saveDocument: () => void;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}
const EditorContext = createContext<EditorContextType | undefined>(undefined);
export const EditorProvider = ({ children }: {children: ReactNode;}) => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [currentDoc, setCurrentDoc] = useState<Document | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState<number>(100);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  // Undo/Redo State
  const [past, setPast] = useState<Document[]>([]);
  const [future, setFuture] = useState<Document[]>([]);
  // Find & Replace State
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  // Clipboard & Formatting
  const [copiedBlock, setCopiedBlock] = useState<TextBlock | null>(null);
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  // Canvas Toggles
  const [showGrid, setShowGrid] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [showMargins, setShowMargins] = useState(true);
  const pushHistory = useCallback((doc: Document) => {
    setPast((prev) => [...prev, doc].slice(-50));
    setFuture([]);
  }, []);
  const undo = useCallback(() => {
    if (past.length === 0 || !currentDoc) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setFuture((prev) => [currentDoc, ...prev]);
    setCurrentDoc(previous);
    setDocuments((docs) =>
    docs.map((d) => d.id === previous.id ? previous : d)
    );
  }, [past, currentDoc]);
  const redo = useCallback(() => {
    if (future.length === 0 || !currentDoc) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setFuture(newFuture);
    setPast((prev) => [...prev, currentDoc]);
    setCurrentDoc(next);
    setDocuments((docs) => docs.map((d) => d.id === next.id ? next : d));
  }, [future, currentDoc]);
  const updateDocState = useCallback(
    (updater: (doc: Document) => Document) => {
      if (!currentDoc) return;
      pushHistory(currentDoc);
      const updated = updater(currentDoc);
      setCurrentDoc(updated);
      setDocuments((docs) =>
      docs.map((d) => d.id === updated.id ? updated : d)
      );
    },
    [currentDoc, pushHistory]
  );
  const updateBlock = useCallback(
    (pageId: string, blockId: string, updates: Partial<TextBlock>) => {
      updateDocState((doc) => ({
        ...doc,
        pages: doc.pages.map((p) =>
        p.id === pageId ?
        {
          ...p,
          blocks: p.blocks.map((b) =>
          b.id === blockId ?
          {
            ...b,
            ...updates
          } :
          b
          )
        } :
        p
        )
      }));
    },
    [updateDocState]
  );
  const addBlock = useCallback(
    (pageId: string, block: Omit<TextBlock, 'id'>) => {
      const newBlock = {
        ...block,
        id: `b_${Date.now()}`
      };
      updateDocState((doc) => ({
        ...doc,
        pages: doc.pages.map((p) =>
        p.id === pageId ?
        {
          ...p,
          blocks: [...p.blocks, newBlock]
        } :
        p
        )
      }));
      setSelectedBlockId(newBlock.id);
      setActiveTool('select');
    },
    [updateDocState]
  );
  const deleteBlock = useCallback(
    (pageId: string, blockId: string) => {
      updateDocState((doc) => ({
        ...doc,
        pages: doc.pages.map((p) =>
        p.id === pageId ?
        {
          ...p,
          blocks: p.blocks.filter((b) => b.id !== blockId)
        } :
        p
        )
      }));
      if (selectedBlockId === blockId) setSelectedBlockId(null);
    },
    [updateDocState, selectedBlockId]
  );
  const runOcr = async (pageId: string) => {
    toast.loading('Running OCR on document...', {
      id: 'ocr'
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateDocState((doc) => ({
      ...doc,
      pages: doc.pages.map((p) =>
      p.id === pageId ?
      {
        ...p,
        isScanned: false
      } :
      p
      )
    }));
    toast.success('OCR completed successfully! Text is now editable.', {
      id: 'ocr'
    });
    setActiveTool('select');
  };
  const addAnnotation = useCallback(
    (pageId: string, annotation: Omit<Annotation, 'id' | 'createdAt'>) => {
      const newAnnotation = {
        ...annotation,
        id: `a_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      updateDocState((doc) => ({
        ...doc,
        pages: doc.pages.map((p) =>
        p.id === pageId ?
        {
          ...p,
          annotations: [...p.annotations, newAnnotation]
        } :
        p
        )
      }));
      setActiveTool('select');
    },
    [updateDocState]
  );
  const saveDocument = useCallback(() => {
    if (!currentDoc) return;
    updateDocState((doc) => ({
      ...doc,
      updatedAt: new Date().toISOString()
    }));
    toast.success('Document saved successfully!');
  }, [currentDoc, updateDocState]);
  // Find & Replace Logic
  const searchResults = useMemo(() => {
    if (!searchQuery || !currentDoc) return [];
    const results: SearchResult[] = [];
    currentDoc.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        if (block.content.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            pageId: page.id,
            blockId: block.id,
            index: results.length
          });
        }
      });
    });
    return results;
  }, [searchQuery, currentDoc]);
  const nextSearchResult = () => {
    if (searchResults.length > 0) {
      const nextIndex = (currentSearchIndex + 1) % searchResults.length;
      setCurrentSearchIndex(nextIndex);
      const res = searchResults[nextIndex];
      setCurrentPageId(res.pageId);
      setSelectedBlockId(res.blockId);
    }
  };
  const prevSearchResult = () => {
    if (searchResults.length > 0) {
      const prevIndex =
      (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
      setCurrentSearchIndex(prevIndex);
      const res = searchResults[prevIndex];
      setCurrentPageId(res.pageId);
      setSelectedBlockId(res.blockId);
    }
  };
  const replaceCurrent = () => {
    if (searchResults.length > 0 && currentDoc) {
      const res = searchResults[currentSearchIndex];
      const page = currentDoc.pages.find((p) => p.id === res.pageId);
      const block = page?.blocks.find((b) => b.id === res.blockId);
      if (block) {
        const regex = new RegExp(searchQuery, 'gi');
        const newContent = block.content.replace(regex, replaceQuery);
        updateBlock(res.pageId, res.blockId, {
          content: newContent
        });
      }
    }
  };
  const replaceAll = () => {
    if (searchResults.length > 0 && currentDoc) {
      updateDocState((doc) => {
        const newDoc = {
          ...doc
        };
        newDoc.pages = newDoc.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) => {
            if (
            block.content.toLowerCase().includes(searchQuery.toLowerCase()))
            {
              const regex = new RegExp(searchQuery, 'gi');
              return {
                ...block,
                content: block.content.replace(regex, replaceQuery)
              };
            }
            return block;
          })
        }));
        return newDoc;
      });
      toast.success(`Replaced ${searchResults.length} occurrences.`);
    }
  };
  return (
    <EditorContext.Provider
      value={{
        documents,
        currentDoc,
        currentPageId,
        activeTool,
        zoom,
        selectedBlockId,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        undo,
        redo,
        searchQuery,
        replaceQuery,
        searchResults,
        currentSearchIndex,
        showFindReplace,
        setSearchQuery,
        setReplaceQuery,
        setShowFindReplace,
        nextSearchResult,
        prevSearchResult,
        replaceCurrent,
        replaceAll,
        copiedBlock,
        setCopiedBlock,
        highlightColor,
        setHighlightColor,
        showGrid,
        setShowGrid,
        showRuler,
        setShowRuler,
        showMargins,
        setShowMargins,
        setCurrentDoc,
        setCurrentPageId,
        setActiveTool,
        setZoom,
        setSelectedBlockId,
        updateBlock,
        addBlock,
        deleteBlock,
        runOcr,
        addAnnotation,
        saveDocument,
        setDocuments
      }}>
      
      {children}
    </EditorContext.Provider>);

};
export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};