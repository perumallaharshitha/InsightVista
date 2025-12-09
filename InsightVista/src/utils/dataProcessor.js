const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length !== headers.length) continue;

        const record = {};
        headers.forEach((header, index) => {
            let value = values[index] ? values[index].trim() : '';
            value = value.replace(/^"|"$/g, ''); // remove surrounding quotes

            if (header === 'Price' || header === 'Quantity') {
                record[header] = Number(value);
            } else {
                record[header] = value;
            }
        });
        data.push(record);
    }
    return data;
};


export const processCSVData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const csvText = event.target.result;
                const processedData = parseCSV(csvText);
                setTimeout(() => {
                    if (processedData.length === 0) {
                        reject(new Error("File is empty or could not be parsed."));
                    } else {
                        resolve(processedData);
                    }
                }, 1500);
            } catch (e) {
                reject(new Error(`Failed to read or parse file: ${e.message}`));
            }
        };
        reader.onerror = () => reject(new Error("Error reading file."));
        reader.readAsText(file);
    });
};

const guessDataType = (value, header) => {
    if (['Price', 'Quantity'].includes(header)) return 'Number';
    if (header.includes('Date')) return 'Date';
    const numValue = Number(value);
    if (!isNaN(numValue) && value !== '') return 'Number';
    return 'Text';
};

export const finalizeTransformation = (rawData, selectedColumns) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const finalData = rawData.map(record => {
                const newRecord = {};
                selectedColumns.forEach(col => {
                    newRecord[col] = record[col];
                });
                return newRecord;
            });
            resolve(finalData);
        }, 1500);
    });
};

export const calculateDataSummary = (data) => {
    if (!data || data.length === 0) return { columns: [], uniqueCategories: [] };
    const firstRow = data[0];
    const columns = Object.keys(firstRow).map(header => ({
        name: header,
        dataType: guessDataType(firstRow[header], header) 
    }));
    const uniqueCategories = [...new Set(data.map(d => d.Category))].filter(c => c);
    return { columns, uniqueCategories };
};
