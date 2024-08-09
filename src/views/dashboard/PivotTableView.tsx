import React, { useState, useEffect } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import './CarrierDataPivotTable.css'; // Import the CSS file

export interface CarrierData {
    created_dt: string;
    data_source_modified_dt: string;
    entity_type: string;
    operating_status: string | null;
    legal_name: string;
    dba_name: string | null;
    physical_address: string;
    p_street: string;
    p_city: string;
    p_state: string;
    p_zip_code: string;
    phone: string;
    mailing_address: string;
    m_street: string;
    m_city: string;
    m_state: string;
    m_zip_code: string | null | undefined;
    usdot_number: number;
    mc_mx_ff_number: string | null;
    power_units: number;
    mcs_150_form_date: string;
    out_of_service_date: string | null;
    state_carrier_id_number: string | null;
    duns_number: string | null;
    drivers: number;
    mcs_150_mileage_year: string;
    id: number;
    credit_score: number | null;
    record_status: string | null;
}

// Function to transform data
const transformData = (data: CarrierData[]) => {
    if (!data || data.length === 0) {
        return [];
    }

    const keys = Object.keys(data[0]); // Extract the keys from the first object
    return [
        keys, // Add keys as the header row
        ...data.map(item => keys.map(key => String(item[key] || ''))) // Map over each item to create an array of values
    ];
};

const CarrierDataPivotTable = () => {
    const [carrierData, setCarrierData] = useState<CarrierData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://carrier-info-backend.onrender.com", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch data:", response.statusText);
                    return;
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    console.error("Unexpected data format:", data);
                    return;
                }

                setCarrierData(data.length <= 0 ? carrierData : data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Transform the data
    const transformedData = transformData(carrierData);

    // State to manage pivot table UI settings
    const [pivotSettings, setPivotSettings] = useState({
        data: transformedData,
        rows: ['entity_type'], // Default row field
        cols: ['operating_status'], // Default column field
        aggregatorName: 'Sum',
        vals: ['drivers'],
        rendererName: 'Table',
    });

    return (
        <div className="container">
            <h1>Carrier Data Pivot Table</h1>
            <PivotTableUI
                className="pivot-table" // Apply the custom class for styling
                {...pivotSettings}
                onChange={(s) => setPivotSettings(s)}
                data={transformedData}
            />
        </div>
    );
};

export default CarrierDataPivotTable;
