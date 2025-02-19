
export const preloadCriticalAssets = () => {
  const criticalAssets = [
    '/manifest.json',
    '/favicon.ico'
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    link.as = asset.endsWith('.js') ? 'script' : 'image';
    document.head.appendChild(link);
  });
};

export const lazyLoadImages = () => {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.src = img.src;
      }
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    import('intersection-observer').then(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            entry.target.src = entry.target.src;
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        observer.observe(img);
      });
    });
  }
};
