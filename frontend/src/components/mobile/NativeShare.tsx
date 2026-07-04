"use client";

import { Share } from "@capacitor/share";
import { isNative } from "@/lib/capacitor";
import { hapticLight } from "@/lib/haptics";

interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export async function nativeShare({ title, text, url }: ShareOptions) {
  await hapticLight();

  if (isNative) {
    await Share.share({
      title,
      text: text ?? title,
      url: url ?? window.location.href,
      dialogTitle: "Share via",
    });
  } else if (navigator.share) {
    await navigator.share({
      title,
      text: text ?? title,
      url: url ?? window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(url ?? window.location.href);
  }
}
