// src/utils/calculatorKPIs.js

/**
 * Calculates primary sales KPIs from the filtered data.
 * @param {Array<Object>} salesData - The array of sales records.
 * @returns {Object} An object containing the calculated KPIs.
 */
export const calculateSalesKPIs = (salesData) => {
  if (!salesData || salesData.length === 0) {
    return {
      totalSales: 0,
      totalOrders: 0,
      avgOrderValue: 0,
    };
  }

  let totalSales = 0;
  let totalOrders = salesData.length;

  salesData.forEach(order => {
    // Calculate total sales by summing (Price * Quantity) for each order
    totalSales += order.Price * order.Quantity;
  });

  // Calculate Average Order Value (AOV)
  const avgOrderValue = totalOrders > 0 
    ? totalSales / totalOrders 
    : 0;

  return {
    // Return values rounded to two decimal places for currency consistency
    totalSales: parseFloat(totalSales.toFixed(2)),
    totalOrders: totalOrders,
    avgOrderValue: parseFloat(avgOrderValue.toFixed(2)),
  };
};

/**
 * Formats a number into a currency string (e.g., 12345.67 -> "$12,345.67").
 * @param {number} value - The numerical value.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(value);
};

/**
 * Formats a number with thousands separators (e.g., 5432 -> "5,432").
 * @param {number} value - The numerical value.
 * @returns {string} The formatted string.
 */
export const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
};