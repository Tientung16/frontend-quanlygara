import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import RepairHooks from '../repairCar/hook';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  aspectRatio: 1 / 1,
  responsive: true,
  scales: {
    x: {
          title: {
            // align: 'end',
            color: 'red',
            display: true,
            text: 'Thời gian ( Tháng )'
          }
        },
        y: {
              max: 600,
              ticks: {
                // callback: (value: number) => (value != 0 ? `${value / 100}` : 0)
              },
              title: {
                color: 'red',
                display: true,
                text: 'Đơn vị tính ( triệu VNĐ)',
                position: 'top',
                // align: 'end',
              }
            }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  // aspectRatio: 1 / 1,
  // responsive: true,
  // scales: {
  //   x: {
  //     title: {
  //       align: 'end',
  //       color: 'red',
  //       display: true,
  //       text: 'Thời gian ( Tháng )'
  //     }
  //   },
  //   y: {
  //     max: 600,
  //     ticks: {
  //       callback: (value: number) => (value != 0 ? `${value / 100}` : 0)
  //     },
  //     title: {
  //       align: 'end',
  //       color: 'red',
  //       display: true,
  //       text: 'Đơn vị tính ( triệu VNĐ)',
  //       position: 'top'
  //     }
  //   }
  // },
  // plugins: {
  //   legend: {
  //     position: 'top' as const
  //   },
  //   title: {
  //     display: true,
  //     text: 'Biểu đồ doanh thu theo tháng ',
  //     position:'bottom'
  //   }
  // }
}

const labels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]
const datas = [150, 200, 250, 300, 350, 400, 525, 250, 300, 350, 400, 525]
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Doanh thu tháng',
//       data: dataChart,
//       backgroundColor: 'rgba(255, 99, 132, 0.5)'
//     },
//   ]
// }

export function Chart() {
  const{GetAllRepairCar} = RepairHooks();
  useEffect(() => {
    loadData();
  },[])
  const [dataChartFinal, setDataChartFinal] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const loadData = async () => {
    const a = await GetAllRepairCar();
    const data = a.data;
    const dataChart = [0,0,0,0,0,0,0,0,0,0,0,0]
    

    // dataChart = [0,0,0,0,0,0,0,0,0,0,0,0]
    data.map((value:any) => {
        const month = moment(value.dateRepair).month() ;
        dataChart[month] = dataChart[month] + value.totalMoney/10000;
        console.log('value.dateRepair',value.dateRepair);
        console.log('a',a);
    })
    console.log('dataChart',dataChart);
    console.log('data',data);
    setDataChartFinal(dataChart)
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu tháng',
        data: dataChartFinal,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
    ]
  }
  return (<Bar options={options} data={data} />)
}

// const date = moment('2023-06-05');
// const month = date.month(); // Lấy chỉ số của tháng (0 - 11)
// console.log(month); // Kết quả: 5 (vì tháng 6 có chỉ số 5 trong mảng từ 0 - 11)