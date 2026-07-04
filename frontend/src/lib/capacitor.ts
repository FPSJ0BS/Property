import { Capacitor } from "@capacitor/core";

/** Whether we're running inside a native Capacitor shell (iOS / Android) */
export const isNative = Capacitor.isNativePlatform();

/** Whether we're running on iOS specifically */
export const isIOS = Capacitor.getPlatform() === "ios";

/** Whether we're running on Android specifically */
export const isAndroid = Capacitor.getPlatform() === "android";

/** Current platform string: 'ios' | 'android' | 'web' */
export const platform = Capacitor.getPlatform();
