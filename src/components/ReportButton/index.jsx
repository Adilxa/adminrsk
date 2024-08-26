import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import $api from '../../api/http';

const flattenObject = (obj, parentKey = '', result = {}) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flattenObject(obj[key], newKey, result);
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
};

const flattenData = (data) => {
    return data.map(item => flattenObject(item));
};


function ReportButton({ data }) {

    const username = localStorage.getItem("user")

    const exportToExcel = async () => {
        if (data && data.length > 0) {
            const flattenedData = flattenData(data);

            const worksheet = XLSX.utils.json_to_sheet(flattenedData);

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(file, `${window.location.pathname == "/" ? "Companies" : window.location.pathname}` + '.xlsx');
            await $api.post("/history", { username: username, date: new Date().toISOString(), nametable: window.location.pathname == "/" ? "Companies" : window.location.pathname })
        } else {
            alert("No Data Yet");
        }
    };

    return (
        <button style={{
            padding: 10,
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#534e9f",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px",
            position: "absolute",
            right: "20px"
        }} onClick={exportToExcel}>Install Report Excel</button>
    )
}

export default ReportButton;
