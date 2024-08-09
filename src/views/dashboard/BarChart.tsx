import React, {FC, useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import moment from 'moment';

export interface IBarChart {
    data: CarrierData[];
    filterEntityType?: string;
}

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
    m_zip_code: string;
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


const processData = (data: CarrierData[]) => {
    // Filter for "OUT-OF-SERVICE" status
    const outOfServiceData = data.filter(
        (item) => item.operating_status === "OUT-OF-SERVICE"
    );

    // Aggregate counts by month and entity type
    const aggregatedData: Record<string, { month: string, CARRIER: number, BROKER: number }> = {};

    outOfServiceData.forEach((item) => {
        const month = moment(item.created_dt).format("YYYY-MM");
        if (!aggregatedData[month]) {
            aggregatedData[month] = { month, CARRIER: 0, BROKER: 0 };
        }
        // Increment the count for the respective entity type
        if (item.entity_type === "CARRIER") {
            aggregatedData[month].CARRIER += 1;
        } else if (item.entity_type === "BROKER") {
            aggregatedData[month].BROKER += 1;
        }
    });

    // Convert aggregated data to an array format suitable for Recharts
    return Object.values(aggregatedData);
};





export const BarChartComponent: FC<IBarChart> = ({ data }) => {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Process data and initialize chartData state
        const processedData = processData(data);
        setChartData(processedData);

        // Load saved chart data from localStorage
        const savedData = localStorage.getItem("chartData");
        if (savedData) {
            setChartData(JSON.parse(savedData));
        }
    }, [data]);

    useEffect(() => {
        // Save chart data to localStorage whenever it changes
        localStorage.setItem("chartData", JSON.stringify(chartData));
    }, [chartData]);

    const handleBarClick = (entry: any, entityType: string) => {
        const newCount = prompt(
            `Enter new ${entityType} count for ${entry.month}:`,
            entry[entityType]
        );
        if (newCount !== null) {
            const updatedData = chartData.map((item: any) =>
                item.month === entry.month
                    ? {
                        ...item,
                        [entityType]: parseInt(newCount, 10),
                    }
                    : item
            );
            setChartData(updatedData);
        }
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="CARRIER"
                    fill="#8884d8"
                    name="Carrier Out of Service"
                    onClick={(entry) => handleBarClick(entry, "CARRIER")}
                />
                <Bar
                    dataKey="BROKER"
                    fill="#82ca9d"
                    name="Broker Out of Service"
                    onClick={(entry) => handleBarClick(entry, "BROKER")}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;