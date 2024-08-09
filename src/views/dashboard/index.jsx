import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import { DataTable } from '../Table';
import BarChartComponent from './BarChart';
import CarrierDataPivotTable from "./PivotTableView";
const Dashboard = () => {
    const [data, setData] = useState([]);
    const filterEntityType = 'CARRIER';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://carrier-info-backend.onrender.com', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(console.log);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={6} xs={12}>
                        <CarrierDataPivotTable />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <BarChartComponent data={data} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <DataTable />
                    </Grid>
                    <Grid item xs={12} md={4}>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
