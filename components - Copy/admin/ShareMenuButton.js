"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareMenuButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-HTTPS/older browsers: hidden textarea + execCommand
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy menu link:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-lg border border-char-line px-4 py-2 font-body text-sm font-semibold text-cream transition-colors hover:border-saffron/50 hover:text-saffron"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
      ) : (
        <Share2 className="h-4 w-4" strokeWidth={2.25} />
      )}
      {copied ? "تم نسخ الرابط!" : "مشاركة رابط القائمة"}
    </button>
  );
}
