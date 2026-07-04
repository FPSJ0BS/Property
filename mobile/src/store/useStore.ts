import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  // Saved properties
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearSaved: () => void;

  // Recently viewed
  recentIds: string[];
  addViewed: (id: string) => void;

  // User preferences
  userName: string;
  userRole: string;
  userCity: string;
  onboardingDone: boolean;
  setUserPrefs: (prefs: Partial<Pick<AppState, "userName" | "userRole" | "userCity" | "onboardingDone">>) => void;

  // Hydration
  hydrated: boolean;
  hydrate: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  savedIds: [],
  recentIds: [],
  userName: "",
  userRole: "",
  userCity: "Jaipur",
  onboardingDone: false,
  hydrated: false,

  toggleSaved: (id) => {
    const current = get().savedIds;
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    set({ savedIds: next });
    AsyncStorage.setItem("saved", JSON.stringify(next));
  },

  isSaved: (id) => get().savedIds.includes(id),

  clearSaved: () => {
    set({ savedIds: [] });
    AsyncStorage.removeItem("saved");
  },

  addViewed: (id) => {
    const current = get().recentIds.filter((x) => x !== id);
    const next = [id, ...current].slice(0, 12);
    set({ recentIds: next });
    AsyncStorage.setItem("recent", JSON.stringify(next));
  },

  setUserPrefs: (prefs) => {
    set(prefs);
    const state = get();
    AsyncStorage.setItem(
      "prefs",
      JSON.stringify({
        userName: state.userName,
        userRole: state.userRole,
        userCity: state.userCity,
        onboardingDone: state.onboardingDone,
      })
    );
  },

  hydrate: async () => {
    try {
      const [saved, recent, prefs] = await Promise.all([
        AsyncStorage.getItem("saved"),
        AsyncStorage.getItem("recent"),
        AsyncStorage.getItem("prefs"),
      ]);
      set({
        savedIds: saved ? JSON.parse(saved) : [],
        recentIds: recent ? JSON.parse(recent) : [],
        ...(prefs ? JSON.parse(prefs) : {}),
        hydrated: true,
      });
    } catch {
      set({ hydrated: true });
    }
  },
}));
