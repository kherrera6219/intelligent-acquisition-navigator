
/**
 * Browser-compatible utility to validate that cleanup was successful
 * This can be run directly in the browser console
 */

// Files that should have been removed
const filesToCheck = [
  'src/components/ui/universal/EnhancedNetworkBanner.tsx',
  'src/hooks/useNetworkStatus.tsx',
  'src/components/ui/universal/NetworkErrorHandler.tsx',
];

// Files that should have been updated
const filesToVerify = [
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldPattern: "import { EnhancedNetworkBanner }",
    newPattern: "import { NetworkStatusBanner }",
    description: "NetworkMonitorProvider import statement"
  },
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldPattern: "<EnhancedNetworkBanner",
    newPattern: "<NetworkStatusBanner",
    description: "NetworkMonitorProvider component usage"
  },
  {
    file: 'src/styles/modules/accessibility/index.css',
    // This file should have been regenerated with imports
    verifyExists: true,
    description: "Regenerated CSS index file"
  }
];

/**
 * Fetches a file and checks if it exists
 */
async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    const response = await fetch(filePath);
    return response.status !== 404;
  } catch (error) {
    console.error(`Error checking if file exists: ${filePath}`, error);
    return false;
  }
}

/**
 * Fetches a file and checks its content
 */
async function checkFileContent(filePath: string, oldPattern: string, newPattern: string): Promise<{
  hasOldPattern: boolean;
  hasNewPattern: boolean;
  error?: string;
}> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      return { 
        hasOldPattern: false, 
        hasNewPattern: false,
        error: `Failed to fetch file: ${response.status} ${response.statusText}`
      };
    }
    
    const content = await response.text();
    const hasOldPattern = content.includes(oldPattern);
    const hasNewPattern = content.includes(newPattern);
    
    return {
      hasOldPattern,
      hasNewPattern
    };
  } catch (error) {
    console.error(`Error checking file content: ${filePath}`, error);
    return { 
      hasOldPattern: false, 
      hasNewPattern: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Main validation function that can be run in the browser
 */
export async function validateCleanup(): Promise<void> {
  console.log('\n🔍 Validating Cleanup Process\n');
  
  // Check if removed files no longer exist
  console.log('Checking if duplicate files have been removed:');
  let allFilesRemoved = true;
  
  for (const file of filesToCheck) {
    const exists = await checkFileExists(file);
    if (exists) {
      console.log(`❌ File still exists: ${file}`);
      allFilesRemoved = false;
    } else {
      console.log(`✅ File successfully removed: ${file}`);
    }
  }
  
  // Verify file updates
  console.log('\nVerifying file updates:');
  let allUpdatesSuccessful = true;
  
  for (const item of filesToVerify) {
    if (item.verifyExists) {
      // Just check if the file exists
      const exists = await checkFileExists(item.file);
      if (exists) {
        console.log(`✅ ${item.description} exists as expected`);
      } else {
        console.log(`❌ ${item.description} doesn't exist`);
        allUpdatesSuccessful = false;
      }
    } else {
      // Check file content
      const exists = await checkFileExists(item.file);
      
      if (!exists) {
        console.log(`❌ File not found: ${item.file}`);
        allUpdatesSuccessful = false;
      } else {
        const { hasOldPattern, hasNewPattern, error } = await checkFileContent(
          item.file, 
          item.oldPattern as string, 
          item.newPattern as string
        );
        
        if (error) {
          console.log(`❌ Error checking ${item.description}: ${error}`);
          allUpdatesSuccessful = false;
        } else if (hasOldPattern) {
          console.log(`❌ ${item.description} still contains old pattern: "${item.oldPattern}"`);
          allUpdatesSuccessful = false;
        } else if (!hasNewPattern) {
          console.log(`❌ ${item.description} doesn't contain new pattern: "${item.newPattern}"`);
          allUpdatesSuccessful = false;
        } else {
          console.log(`✅ ${item.description} successfully updated`);
        }
      }
    }
  }
  
  // Generate overall summary
  console.log('\n----- Cleanup Validation Summary -----');
  
  if (allFilesRemoved && allUpdatesSuccessful) {
    console.log('✅ SUCCESS: All duplicate files have been removed and imports have been properly updated.');
  } else {
    console.log('❌ ISSUES FOUND: Some cleanup tasks were not completed successfully.');
    
    if (!allFilesRemoved) {
      console.log('  - Some duplicate files still exist in the project.');
    }
    
    if (!allUpdatesSuccessful) {
      console.log('  - Some file updates were not successfully applied.');
    }
  }
  
  console.log('\nFor detailed instructions on fixing any issues manually, refer to cleanup-README.md');
}

// Export a function that can be run directly in the console
export function runValidation(): void {
  console.log('🚀 Running cleanup validation...');
  validateCleanup().catch(error => {
    console.error('Error during validation:', error);
  });
}
