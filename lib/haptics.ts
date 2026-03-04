import { WebHaptics, type HapticInput } from "web-haptics";

let _instance: WebHaptics | null = null;

function getInstance(): WebHaptics | null {
  if (typeof window === "undefined") return null;
  if (!_instance) {
    _instance = new WebHaptics();
  }
  return _instance;
}

export function triggerHaptic(preset: HapticInput = "light"): void {
  getInstance()?.trigger(preset);
}
