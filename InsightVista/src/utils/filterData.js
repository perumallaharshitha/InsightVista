export const filterSalesData = (masterData, filters) => {
    if (!masterData || masterData.length === 0) return [];
    
    const { dateRange, region, category } = filters;
    const [startDate, endDate] = dateRange;

    const startTimestamp = startDate ? startDate.getTime() : null;
    const endTimestamp = endDate ? endDate.getTime() : null;

    return masterData.filter(record => {
        if (startDate || endDate) {
            const orderDate = new Date(record.OrderDate);
            const orderTimestamp = orderDate.getTime();

            if (startDate && orderTimestamp < startTimestamp) {
                return false;
            }
            if (endDate && orderTimestamp > endTimestamp + 86399999) {
                return false;
            }
        }

        if (region !== 'All' && record.Region !== region) {
            return false;
        }

        if (category !== 'All' && record.Category !== category) {
            return false;
        }
        
        return true;
    });
};
