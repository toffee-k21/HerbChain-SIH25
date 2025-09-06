"use client";
import { useEffect, useState } from "react";

export default function InstallButton() {
    console.log("hellooooooooo")
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    console.log("hello");
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User choice:", outcome);
    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={() => handleInstallClick()}
      disabled={!deferredPrompt}
      className="px-4 bg-neutral-800 text-white rounded-lg"
    >
      Install PWA
    </button>
  );
}
