"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Saved Properties ───
const SAVED_KEY = "99tolet-saved-properties";

export function useSavedProperties() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_KEY);
      if (stored) setSaved(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);
  const count = saved.length;

  const clearAll = useCallback(() => {
    setSaved([]);
    localStorage.removeItem(SAVED_KEY);
  }, []);

  return { saved, toggle, isSaved, count, clearAll };
}

// ─── Recently Viewed ───
const RECENT_KEY = "99tolet-recently-viewed";
const MAX_RECENT = 12;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch {}
  }, []);

  const addViewed = useCallback((id: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((x) => x !== id);
      const next = [id, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recent, addViewed, count: recent.length };
}

// ─── User Preferences ───
const PREFS_KEY = "99tolet-user-prefs";

interface UserPrefs {
  name?: string;
  role?: string;
  city?: string;
  budget?: string;
  onboardingComplete?: boolean;
}

export function useUserPrefs() {
  const [prefs, setPrefs] = useState<UserPrefs>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      if (stored) setPrefs(JSON.parse(stored));
    } catch {}
  }, []);

  const updatePrefs = useCallback((updates: Partial<UserPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(PREFS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { prefs, updatePrefs };
}

// ─── Visit Notes ───
const NOTES_KEY = "99tolet-property-notes";

export function usePropertyNotes() {
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, []);

  const setNote = useCallback((propertyId: string, note: string) => {
    setNotes((prev) => {
      const next = { ...prev, [propertyId]: note };
      if (!note.trim()) delete next[propertyId];
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getNote = useCallback((propertyId: string) => notes[propertyId] || "", [notes]);

  return { notes, setNote, getNote };
}

// ─── Collections (shareable lists) ───
const COLLECTIONS_KEY = "99tolet-collections";

export interface Collection {
  id: string;
  name: string;
  propertyIds: string[];
  note: string;
  createdAt: string;
  shareCode: string;
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLECTIONS_KEY);
      if (stored) setCollections(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((cols: Collection[]) => {
    setCollections(cols);
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(cols));
  }, []);

  const createCollection = useCallback((name: string, note: string = "") => {
    const col: Collection = {
      id: "col_" + Date.now(),
      name,
      propertyIds: [],
      note,
      createdAt: new Date().toISOString(),
      shareCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    persist([...collections, col]);
    return col;
  }, [collections, persist]);

  const addToCollection = useCallback((collectionId: string, propertyId: string) => {
    persist(collections.map(c =>
      c.id === collectionId && !c.propertyIds.includes(propertyId)
        ? { ...c, propertyIds: [...c.propertyIds, propertyId] }
        : c
    ));
  }, [collections, persist]);

  const removeFromCollection = useCallback((collectionId: string, propertyId: string) => {
    persist(collections.map(c =>
      c.id === collectionId
        ? { ...c, propertyIds: c.propertyIds.filter(id => id !== propertyId) }
        : c
    ));
  }, [collections, persist]);

  const deleteCollection = useCallback((collectionId: string) => {
    persist(collections.filter(c => c.id !== collectionId));
  }, [collections, persist]);

  return { collections, createCollection, addToCollection, removeFromCollection, deleteCollection };
}

// ─── Persistent Comparison ───
const COMPARE_KEY = "99tolet-compare-list";

export function usePersistentComparison() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev;
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    localStorage.removeItem(COMPARE_KEY);
  }, []);

  const isComparing = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  return { compareIds, toggleCompare, clearCompare, isComparing, count: compareIds.length };
}

// ─── Affordability ───
const INCOME_KEY = "99tolet-monthly-income";

export function useAffordability() {
  const [income, setIncomeState] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(INCOME_KEY);
      if (stored) setIncomeState(parseInt(stored));
    } catch {}
  }, []);

  const setIncome = useCallback((amount: number) => {
    setIncomeState(amount);
    localStorage.setItem(INCOME_KEY, amount.toString());
  }, []);

  const canAfford = useCallback((rent: number) => {
    if (!income) return null; // unknown
    const ratio = rent / income;
    if (ratio <= 0.3) return "comfortable"; // green
    if (ratio <= 0.4) return "stretching"; // yellow
    return "expensive"; // red
  }, [income]);

  const getRatio = useCallback((rent: number) => {
    if (!income) return null;
    return Math.round((rent / income) * 100);
  }, [income]);

  return { income, setIncome, canAfford, getRatio };
}
