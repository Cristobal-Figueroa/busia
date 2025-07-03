// Función para registrar el Service Worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.log('Service workers are not supported.');
  }
};

// Función para comprobar si la app puede ser instalada
export const checkInstallable = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que Chrome muestre automáticamente la solicitud de instalación
    e.preventDefault();
    // Guardar el evento para poder activarlo más tarde
    window.deferredPrompt = e;
    
    // Opcional: Mostrar algún elemento UI para indicar que la app es instalable
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', async () => {
        if (!window.deferredPrompt) {
          return;
        }
        
        // Mostrar el prompt de instalación
        window.deferredPrompt.prompt();
        
        // Esperar a que el usuario responda al prompt
        const { outcome } = await window.deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // Limpiar la referencia
        window.deferredPrompt = null;
        
        // Ocultar el botón de instalación
        installButton.style.display = 'none';
      });
    }
  });
};
