
const fs = require('fs');
const path = require('path');

// Files to be removed due to duplication
const filesToRemove = [
  // Network related components with overlapping functionality
  'src/components/ui/universal/EnhancedNetworkBanner.tsx',
  
  // Network related hooks
  'src/hooks/useNetworkStatus.tsx',
  
  // CSS duplications - clean up redundant imports
  'src/styles/modules/accessibility/index.css',
  
  // Duplicate routing components
  'src/routes/index.js',
  
  // Additional duplicated files that have been refactored
  'src/hooks/useNetworkStatus.ts',
  'src/components/ui/universal/NetworkErrorHandler.duplicate.tsx'
];

// Function to remove a file if it exists
function removeFileIfExists(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Successfully removed: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error removing ${filePath}:`, error.message);
    }
  } else {
    console.warn(`⚠️ File not found: ${filePath}`);
  }
}

// Function to update imports in a file
function updateImportsInFile(filePath, oldImport, newImport) {
  const fullPath = path.resolve(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found for import updates: ${filePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(oldImport)) {
      content = content.replace(new RegExp(oldImport, 'g'), newImport);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated imports in: ${filePath}`);
    } else {
      console.log(`ℹ️ No updates needed in: ${filePath} (pattern not found)`);
    }
  } catch (error) {
    console.error(`❌ Error updating imports in ${filePath}:`, error.message);
  }
}

// Files that need import updates
const importsToUpdate = [
  // Update imports after removing EnhancedNetworkBanner
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldImport: "import { EnhancedNetworkBanner } from './EnhancedNetworkBanner';",
    newImport: "import { NetworkStatusBanner } from './NetworkStatusBanner';"
  },
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldImport: "<EnhancedNetworkBanner isOffline={!isOnline} isReconnecting={isReconnecting} />",
    newImport: "<NetworkStatusBanner isOffline={!isOnline} isReconnecting={isReconnecting} />"
  },
  // Update imports after removing useNetworkStatus
  {
    file: 'src/hooks/useNetworkOperation.ts',
    oldImport: "import { useNetworkStatus } from '@/hooks/useNetworkStatus';",
    newImport: "import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';"
  },
  {
    file: 'src/hooks/useQueryWithCache.ts',
    oldImport: "import { useNetworkStatus } from './useNetworkStatus';",
    newImport: "import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';"
  },
  {
    file: 'src/hooks/useOfflineChecklistData.ts',
    oldImport: "import { useNetworkStatus } from '@/hooks/useNetworkStatus';",
    newImport: "import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';"
  },
  // Add more import updates as needed
];

// Main execution
console.log('\n🔍 Starting cleanup of duplicate files...\n');

// Remove files
filesToRemove.forEach(file => {
  removeFileIfExists(file);
});

// Update imports
importsToUpdate.forEach(({file, oldImport, newImport}) => {
  updateImportsInFile(file, oldImport, newImport);
});

console.log('\n✨ Cleanup completed!\n');
