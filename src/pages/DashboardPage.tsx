import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useEditor } from '../context/EditorContext';
import { Navbar } from '../components/Navbar';
import {
  FileText,
  Clock,
  MoreVertical,
  Upload,
  Search,
  LayoutGrid,
  List,
  Star,
  Trash2 } from
'lucide-react';
import { toast } from 'sonner';
export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { documents, setDocuments, setCurrentDoc, setCurrentPageId } =
  useEditor();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  useEffect(() => {
    if (!user) navigate('/auth');else
    if (user.role === 'guest') navigate('/editor');
  }, [user, navigate]);
  if (!user || user.role === 'guest') return null;
  const openDocument = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      setCurrentDoc(doc);
      setCurrentPageId(doc.pages[0].id);
      navigate('/editor');
    }
  };
  const toggleStar = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setDocuments((docs) =>
    docs.map((d) =>
    d.id === docId ?
    {
      ...d,
      isStarred: !d.isStarred
    } :
    d
    )
    );
  };
  const deleteDoc = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments((docs) => docs.filter((d) => d.id !== docId));
      toast.success('Document deleted');
    }
  };
  const sortedDocs = [...documents].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'size')
    return parseFloat(b.fileSize || '0') - parseFloat(a.fileSize || '0');
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors shadow-sm">
            
            <Upload className="w-4 h-4" /> Upload PDF
          </button>
        </div>

        {/* Drag Drop Zone */}
        <div
          className="mb-8 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => navigate('/editor')}>
          
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">
            Drag & drop PDFs here to upload
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-primary">
                
                <option value="recent">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
                <option value="size">File Size</option>
              </select>
              <div className="flex bg-gray-100 p-1 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>
                  
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>
                  
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'divide-y divide-gray-100'}`}>
            
            {sortedDocs.map((doc, idx) =>
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: idx * 0.05
              }}
              key={doc.id}
              className={
              viewMode === 'grid' ?
              'border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col' :
              'flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group'
              }
              onClick={() => openDocument(doc.id)}>
              
                {viewMode === 'grid' ?
              <>
                    <div className="aspect-[1/1.2] bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                      onClick={(e) => toggleStar(e, doc.id)}
                      className="p-1.5 bg-white/80 backdrop-blur rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      
                          <Star
                        className={`w-4 h-4 ${doc.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>{doc.fileSize}</span>
                      <span>
                        {new Date(doc.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </> :

              <>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors flex items-center gap-2">
                          {doc.title}
                          {doc.isStarred &&
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      }
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{' '}
                            {new Date(doc.updatedAt).toLocaleDateString()}
                          </span>
                          <span>{doc.pages.length} pages</span>
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                    onClick={(e) => toggleStar(e, doc.id)}
                    className="p-2 text-gray-400 hover:text-yellow-500 rounded-full">
                    
                        <Star
                      className={`w-5 h-5 ${doc.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    
                      </button>
                      <button
                    onClick={(e) => deleteDoc(e, doc.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full">
                    
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </>
              }
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>);

};