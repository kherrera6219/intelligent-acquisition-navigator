
import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/serviceWorker.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('New app update is available. Reload to update?')) {
          window.location.reload();
        }
      }
    });

    wb.addEventListener('controlling', () => {
      window.location.reload();
    });

    wb.register();
  }
}

// Call this function to unregister the service worker
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      registration.unregister();
    }
  }
}
