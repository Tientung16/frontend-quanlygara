import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import AccessoryHooks from "../Accessory/hook";
import RepairHooks from "../repairCar/hook";
export interface TableInventoryData {
    // key: React.Key
    name: string
    import: number
    export: number
    // total:number
  }
function Inventory() {
  const{GetDataSelectAccessory,listComboboxAccessory,UpdateAccessory} = AccessoryHooks();
  const{GetAllDetailRepairCar} = RepairHooks();
  const[dataSource,setDataSource] = useState();
  useEffect(() => {
    GetDataSelectAccessory()
  },[])

  useEffect(() => {
    loadData()
   
  },[])
  const loadData = async () => {
    const c = await GetAllDetailRepairCar();
    const filteredList = listComboboxAccessory.filter((item:any) => c.data.filter((dataItem:any) => dataItem.idAccessory === item.id));
    const filteredList2 = c.data.filter((item:any) => listComboboxAccessory.filter((dataItem:any) => dataItem.id === item.idAccessory));
    console.log('filteredList',filteredList);
    console.log('filteredList2',filteredList2);
    
    const resultObj = filteredList2.reduce((acc:any, item:any) => {
      const { idAccessory, number } = item;
      if (acc[idAccessory]) {
        acc[idAccessory] += number;
      } else {
        acc[idAccessory] = number;
      }
      return acc;
    }, {});
    const resultArray = Object.keys(resultObj).map((idAccessory) => ({
      idAccessory: idAccessory,
      number: resultObj[idAccessory],
    }));
    console.log("resultArray",resultArray);
    console.log("resultObj",resultObj);
    

    const mergedList = filteredList.map((item1:any) => {
      const matchingItem = resultArray.find((item2:any) => item2.idAccessory === item1.id);
    
      if (matchingItem) {
        return {name: item1.name, import: parseInt(item1.number) + parseInt(matchingItem.number), export: matchingItem.number};
        // totalMoney: parseInt(item1.cost) *  parseInt(item2.number)
      }
    
      return item1;
    });
    setDataSource(mergedList);
    console.log('mergedList',mergedList);
    console.log('listComboboxAccessory',listComboboxAccessory);
    
  }
  
const columnInventory: ColumnsType<TableInventoryData> = [
  // {
  //   title: 'TT',
  //   render: (_, data) => <>{data.key}</>
  // },
  {
    title: "stt",
    align: 'center',
    render: (option, record, index) => <span>{index + 1}</span>,
  },
  {
    title: 'Tên Mặt Hàng',
    render: (_, data) => <>{data.name}</>
  },
  {
    title: 'Nhập Hàng',
    align:'center',
    render: (_, data) => <>{data.import}</>
  },
  {
    title: 'Xuất Hàng',
    align:'center',
    render: (_, data) => <>{data.export}</>
  },
  {
    title: 'Tồn kho',
    align:'center',
    render: (_, data) => 
    {
      const finish = data.import - data.export
      return finish
    }
    // <>{data.total}</>
  }
]
// const inventory: TableInventoryData[] = [
//     {
//       // key: 1,
//       name: 'Bộ LED panel 12W Âm, tròn',
//       import: 5,
//       export: 1,
//       total:113
//     },
//     {
//       // key: 2,
//       name: 'Bộ LED panel 24W Âm, tròn',
//       import: 10,
//       export: 5,
//       total:98
//     },
//     {
//       // key: 3,
//       name: 'Phanh',
//       import: 5,
//       export: 1,
//       total:40
//     },
//     {
//       // key: 4,
//       name: 'Dầu máy',
//       import: 8,
//       export: 4,
//       total:50
//     },
//     {
//       // key: 5,
//       name: 'Yên xe máy',
//       import: 5,
//       export: 1,
//       total:50
//     },
//     {
//       // key: 6,
//       name: 'lốp',
//       import: 5,
//       export: 1,
//       total:50
//     }
//   ]
    return(
        <Table
        columns={columnInventory}
        dataSource={dataSource}
    />
    )
}
export default Inventory;