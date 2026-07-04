"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  Check,
  Plus,
  Share2,
  Trash2,
  ChevronDown,
  X,
} from "lucide-react";
import { useCollections } from "@/lib/store";

interface ShareCollectionProps {
  propertyId: string;
  propertyTitle: string;
}

export default function ShareCollection({ propertyId, propertyTitle }: ShareCollectionProps) {
  const {
    collections,
    createCollection,
    addToCollection,
    removeFromCollection,
    deleteCollection,
  } = useCollections();

  const [isOpen, setIsOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowCreate(false);
        setNewName("");
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const col = createCollection(newName.trim());
    addToCollection(col.id, propertyId);
    setNewName("");
    setShowCreate(false);
  };

  const handleToggle = (collectionId: string, isInCollection: boolean) => {
    if (isInCollection) {
      removeFromCollection(collectionId, propertyId);
    } else {
      addToCollection(collectionId, propertyId);
    }
  };

  const handleShare = (col: typeof collections[0]) => {
    const propertyList = col.propertyIds
      .map((_, i) => `${i + 1}. Property`)
      .join("\n");
    const message = encodeURIComponent(
      `Check out my property shortlist "${col.name}" on 99tolet!\n\n` +
        `${col.propertyIds.length} properties saved including "${propertyTitle}"\n\n` +
        `Share code: ${col.shareCode}\n` +
        `View at: https://99tolet.com/collections/${col.shareCode}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const isInAnyCollection = collections.some((c) =>
    c.propertyIds.includes(propertyId)
  );

  return (
    <div className="relative inline-flex">
      {/* Trigger */}
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
          isInAnyCollection
            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400"
            : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
        }`}
      >
        <FolderPlus className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isInAnyCollection ? "In Collection" : "Add to Collection"}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 right-0 w-72 sm:w-80 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Collections
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowCreate(false);
                }}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Collection list */}
            <div className="max-h-60 overflow-y-auto">
              {collections.length === 0 && !showCreate ? (
                <div className="px-4 py-6 text-center">
                  <FolderPlus className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    Create your first collection
                  </p>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Collection
                  </button>
                </div>
              ) : (
                collections.map((col) => {
                  const isIn = col.propertyIds.includes(propertyId);
                  return (
                    <div
                      key={col.id}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors group"
                    >
                      <button
                        onClick={() => handleToggle(col.id, isIn)}
                        className="flex items-center gap-3 flex-1 min-w-0 text-left"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isIn
                              ? "bg-blue-600 border-blue-600"
                              : "border-zinc-300 dark:border-zinc-600"
                          }`}
                        >
                          {isIn && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            {col.name}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {col.propertyIds.length} propert{col.propertyIds.length === 1 ? "y" : "ies"}
                          </p>
                        </div>
                      </button>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => handleShare(col)}
                          className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                          title="Share via WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCollection(col.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                          title="Delete collection"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Create new */}
            <div className="border-t border-zinc-100 dark:border-zinc-700/50 p-3">
              {showCreate ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    placeholder="Collection name..."
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleCreate}
                    disabled={!newName.trim()}
                    className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowCreate(true)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create New Collection
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
