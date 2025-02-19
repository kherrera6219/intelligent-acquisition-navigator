
interface ImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export const optimizeImageUrl = (url: string, options: ImageOptimizationOptions = {}) => {
  const {
    quality = 80,
    maxWidth = 1200,
    format = 'webp'
  } = options;

  // If it's already an optimized URL, return as is
  if (url.includes('optimized=true')) {
    return url;
  }

  // For demonstration, we'll assume a CDN that accepts optimization parameters
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${maxWidth}&q=${quality}&fmt=${format}&optimized=true`;
};

export const preloadCriticalAssets = () => {
  const criticalAssets = [
    '/fonts/inter-var.woff2',
    '/images/hero-image.webp',
    '/images/logo.svg'
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    
    if (asset.endsWith('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (asset.endsWith('.webp')) {
      link.as = 'image';
      link.type = 'image/webp';
    } else if (asset.endsWith('.svg')) {
      link.as = 'image';
      link.type = 'image/svg+xml';
    }

    document.head.appendChild(link);
  });
};

export const lazyLoadImages = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img').forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};
