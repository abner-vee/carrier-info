// ==============================|| DASHBOARD - CARRIER DATA BAR CHART ||============================== //

// Sample data
const carriers = [
  {
    legal_name: 'THOMAS WALDRUM',
    power_units: 1,
    drivers: 1,
    mcs_150_mileage_year: '15,000 (2022)'
  },
  {
    legal_name: 'SERGIO ALBERTO MONTEMAYOR LEAL',
    power_units: 8,
    drivers: 8,
    mcs_150_mileage_year: '39,600 (2023)'
  },
  {
    legal_name: 'BAKER TRANSPORT ENTERPRISE CORP',
    power_units: 1,
    drivers: 1,
    mcs_150_mileage_year: '5 (2022)'
  },
  {
    legal_name: 'GARIBAY LOGISTICS',
    power_units: 2,
    drivers: 2,
    mcs_150_mileage_year: '10 (2022)'
  }
];

// Extract mileage data
const mileageData = carriers.map(carrier => {
  const mileage = parseInt(carrier.mcs_150_mileage_year.split(' ')[0].replace(/,/g, ''));
  return mileage;
});

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'carrier-data-bar-chart',
      stacked: false,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: carriers.map(carrier => carrier.legal_name)
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Power Units',
      data: carriers.map(carrier => carrier.power_units)
    },
    {
      name: 'Drivers',
      data: carriers.map(carrier => carrier.drivers)
    },
    {
      name: 'Mileage (2022/2023)',
      data: mileageData
    }
  ]
};

export default chartData;
