
/**
 * Utility functions for formatting data in the application
 */

/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    // Format options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date error';
  }
};

/**
 * Format a number as currency (USD)
 * @param amount - Number to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  if (amount === undefined || amount === null) return '$0.00';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$0';
  }
};

/**
 * Format a number as a percentage
 * @param value - Number to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  if (value === undefined || value === null) return '0%';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value / 100);
  } catch (error) {
    console.error('Error formatting percentage:', error);
    return '0%';
  }
};
