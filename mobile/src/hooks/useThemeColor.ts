import { useColorScheme } from "react-native";
import { Colors } from "../constants/theme";

export function useThemeColors() {
  const scheme = useColorScheme() ?? "light";
  return Colors[scheme];
}
