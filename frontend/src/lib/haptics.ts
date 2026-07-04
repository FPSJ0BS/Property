"use client";

import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { isNative } from "./capacitor";

/** Light tap — use for tab switches, toggles, selections */
export async function hapticLight() {
  if (!isNative) return;
  await Haptics.impact({ style: ImpactStyle.Light });
}

/** Medium tap — use for button presses, card interactions */
export async function hapticMedium() {
  if (!isNative) return;
  await Haptics.impact({ style: ImpactStyle.Medium });
}

/** Heavy tap — use for important actions like saving, deleting */
export async function hapticHeavy() {
  if (!isNative) return;
  await Haptics.impact({ style: ImpactStyle.Heavy });
}

/** Success notification haptic */
export async function hapticSuccess() {
  if (!isNative) return;
  await Haptics.notification({ type: NotificationType.Success });
}

/** Warning notification haptic */
export async function hapticWarning() {
  if (!isNative) return;
  await Haptics.notification({ type: NotificationType.Warning });
}

/** Error notification haptic */
export async function hapticError() {
  if (!isNative) return;
  await Haptics.notification({ type: NotificationType.Error });
}

/** Selection changed haptic — use for scrolling through lists */
export async function hapticSelection() {
  if (!isNative) return;
  await Haptics.selectionChanged();
}
