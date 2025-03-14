
# Project Cleanup Scripts

This directory contains scripts for cleaning up duplicate files and optimizing CSS imports in the project.

## Scripts Overview

1. **cleanup-duplicates.js**: Removes identified duplicate files and updates imports where necessary.
2. **regenerate-css-indexes.js**: Regenerates CSS index files to eliminate duplicate imports.
3. **cleanup-and-regenerate.js**: Master script that runs both scripts in sequence.

## How to Run

To run the complete cleanup process:

```bash
node cleanup-and-regenerate.js
```

Or run individual scripts:

```bash
# To just remove duplicate files
node cleanup-duplicates.js

# To just regenerate CSS index files
node regenerate-css-indexes.js
```

## What These Scripts Do

- Remove unnecessary duplicate network components
- Remove redundant network-related hooks
- Clean up duplicate CSS imports
- Regenerate index files for better organization

## After Running

After running these scripts, you should:

1. Check that the application still builds and runs correctly
2. Make sure no references to removed files remain
3. Commit the changes to version control

## Customization

If you identify additional duplicate files that should be removed, add them to the `filesToRemove` array in `cleanup-duplicates.js`.
