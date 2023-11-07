import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Search from 'antd/lib/input/Search';
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SaveOutlined,
    SendOutlined
} from '@ant-design/icons';
import Notification from "../NoticationCustom";
import RepairHooks from "./hook";
import ReceiveHooks from "../RecieveCar/hook";
import RepairCarUpdate from "./repairCar-update";
import RepairCarCreate from "./repairCar-create";
import { generatePdf } from "../pdf_services/pdf-service";
import { genDocDefinition } from "./generate-pdf";
import CustomerHooks from "../Customer/hook";
import moment from "moment";
import AccessoryHooks from "../Accessory/hook";
import SupplierHooks from "../Supplier/hook";

const RepairCar = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [totalItems, setTotalItems] = useState();
    const [receiveCarID, setReceiveCarID] = useState(String);
    const{GetDataSelectAccessory,listComboboxAccessory,UpdateAccessory} = AccessoryHooks();
    const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();

    const [record, setRecord] = useState();
    const {
        // GetDataSearch,
        DeleteRepairCar,
        GetEntityTotal,

        // RepairCarList,
        // totalItems,
        updateSuccess,
        SetActiveToBuild,
        GetRepairCar,
        data
      } = RepairHooks();
    const {GetDataRepair,ReceiveCarList,GetReceiveCar} = ReceiveHooks();
    const {GetCustomer,} = CustomerHooks();

  useEffect(() => {
    loadTotalPage()
    GetDataSelectAccessory()
    GetDataSelectSupplier()
  },[])

  const loadTotalPage = async () => {
    const total = await GetEntityTotal()
    console.log('total',total);
    
    setTotalItems(total.data)
  }
    console.log('ReceiveCarList',ReceiveCarList);
    
    // const {
    //   GetCustomer,
    // } = CustomerHooks();
    const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    name:""
    });
    const { current, pageSize , name} = pagination;
    const onChangePagination = (paginationChange:any) => {
    const { current, pageSize } = paginationChange;
    setPagination({ ...pagination, current, pageSize });
    };
    useEffect(() => {
    console.log('runzzz');
    
    GetDataRepair(pagination);
    },[pagination, updateSuccess])

    const columns: TableColumnsType<any> = [
        {
          title: "stt",
          align: 'center',
          render: (option, record, index) => <span>{index + 1}</span>,
        },
        // {
        //   title: "Tên khách hàng",
        //   dataIndex: 'nameCustomer',
        //   key: 'nameCustomer',
        //   align: 'center',
        //   render(option, record, index){
        //     console.log('record',record);
        //     const a = await GetCustomer(record.idCustomer);
        //     const Entity = a.data;
        //     return 'a';
        //   },
        // },
        {
          title: "Biển số xe",
          dataIndex: 'licensePlates',
          key: 'licensePlates',
          align: 'center',
          render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
        },
        {
          title: "Ngày nhận xe",
          dataIndex: 'dateReceive',
          key: 'dateReceive',
          align: 'center',
          render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
        },
        {
          title: "Thao tác",
          align: 'center',
          render(value, record: any, index) {
            return (
              <>
                <Space>
                  <Tooltip placement="top" title="chi tiết">
                    <Button
                      icon={<InfoOutlined />}
                      className="btn-green"
                      shape="circle"
                      onClick={() => {
                        handleOnClickDetail(record);
                      }}
                    />
                  </Tooltip>
                  {(
                    <Tooltip placement="top" title="Thêm mới">
                      <Button
                        icon={<SaveOutlined />}
                        className={record?.isCreated === true ? 'btn-edit-disabled' : 'btn-edit'}
                        disabled={record?.isCreated === true}
                        shape="circle"
                        onClick={() => {                        
                          handleOnClickUpdate(record);
                        }}
                      />
                    </Tooltip>
                  )}
    
                  {(
                    <Tooltip placement="top" title="Cập nhật">
                      <Button
                        icon={<EditOutlined />}
                        className={record?.isCreated === false ? 'btn-edit-disabled' : 'btn-edit'}
                        disabled={record?.isCreated === false}
                        // className="btn-edit"
                        shape="circle"
                        onClick={() => {                        
                          handleOnClickCreate(record);
                        }}
                      />
                    </Tooltip>
                  )}
                  {(
                    <Notification
                      keyProp={record?.id}
                      type="warning"
                      className="btn-delete"
                      message= ""
                      description="bạn có muốn xóa bản ghi này"
                      titleTooltip="xóa"
                      textOK="Xác nhận"
                      textCancel="Đóng"
                      onAccept={() => {
                        handleDelete(record?.id);
                      }}
                      onCancel={() => { }}
                      icon={<DeleteOutlined />}
                    />
                  )}
                  {(
                    <Tooltip placement="top" title="Thanh toán">
                    <Button
                      className="btn-edit"
                      onClick={() => {
                        pdf(record);
                        handleNumber(record)
                      }
                      }
                      shape="circle"
                      icon={<SendOutlined />}
                      danger
                    />
                    </Tooltip>
                  )}
                </Space>
              </>
            );
          },
        },
      ];
      const handleNumber = async (record:any) =>{
        const c = await data(record.id);

        

      }
  
      const pdf = (record: any) => {
        const callAPI = async () => {
          // const data = await GetSubReqResult(id);

          const b = await GetReceiveCar(record.id);
          const EntityV2 = b.data;
          // formModal.setFieldValue('dateReceive', moment(EntityV2.dateReceive));
          // formModal.setFieldValue('idAutomaker', EntityV2.idAutomaker);
          // formModal.setFieldValue('licensePlates', EntityV2.licensePlates);

          const a = await GetCustomer(record.idCustomer);
          const Entity = a.data;
          // formModal.setFieldValue('address', Entity.address);
          // formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
          // formModal.setFieldValue('name', Entity.name);

          const result = await GetRepairCar(record.id);
          const EntityRepairCar = result.data;
          // formModal.setFieldValue('dateRepair', moment(EntityRepairCar.dateRepair));
          // formModal.setFieldValue('wage', EntityRepairCar.wage);
          // formModal.setFieldValue('totalMoney', EntityRepairCar.totalMoney);

          const c = await data(record.id);
          
          // const customer = {
          //   id:record.idCustomer,
          //   name: Entity.name,
          //   address: Entity.address,
          //   phoneNumber: Entity.phoneNumber,
          // };
          const resultArray: any[] = [];
          const filteredList = listComboboxAccessory.filter((item:any) => c.data.some((dataItem:any) => dataItem.idAccessory === item.id));
          const filteredList2 = c.data.filter((item:any) => listComboboxAccessory.some((dataItem:any) => dataItem.id === item.idAccessory));
          console.log('filteredList',filteredList);
          console.log('filteredList2',filteredList2);
          // for(let i=0;i<filteredList.length;i++){
          //   if(filteredList[i].id === filteredList2[i].idAccessory){
          //     resultArray[i] = parseInt(filteredList[i].number) - parseInt(filteredList2[i].number);
          //   }
          // }
          filteredList.map((value:any) => {
            filteredList2.map((value2:any) => {
              if(value.id === value2.idAccessory){
                const result = parseInt(value.number) - parseInt(value2.number);
                resultArray.push(result);
              }
            })
          })
          console.log('filteredList after trừ',resultArray);

        //đoạn này nên làm trên be
        for(let i=0;i<filteredList.length;i++){
          const dataUpdate = {
            id:filteredList[i].id,
            name:filteredList[i].name,
            cost:filteredList[i].cost,
            codeSupplier:filteredList[i].codeSupplier,
            number:resultArray[i]
          };
          console.log('dataUpdate',dataUpdate);
      
          UpdateAccessory(dataUpdate);
        }
        
        
        const mergedList = filteredList.map((item1:any) => {
          const matchingItem = filteredList2.find((item2:any) => item2.idAccessory === item1.id);
        
          if (matchingItem) {
            return { ...item1, ...matchingItem };
            // totalMoney: parseInt(item1.cost) *  parseInt(item2.number)
          }
        
          return item1;
        });
        console.log('mergedList',mergedList);
        console.log('listComboboxAccessory',listComboboxAccessory);
        console.log('ListComboboxSupplier',ListComboboxSupplier);
        
        
 
          const dataPdf = {
            // customer,
            name: Entity.name,
            address: Entity.address,
            phoneNumber: Entity.phoneNumber,
            licensePlates: EntityV2.licensePlates,
            idAutomaker: EntityV2.idAutomaker,
            // idReceive:record.id,
            dateReceive:  moment(EntityV2.dateReceive),
            dateRepair:EntityRepairCar.dateRepair,
            wage:EntityRepairCar.wage,
            repairCarDetail:mergedList,
            // c.data,
            totalMoney:EntityRepairCar.totalMoney,
            listComboboxAccessory:listComboboxAccessory,
            ListComboboxSupplier:ListComboboxSupplier
          };
          console.log('dataPdf',dataPdf);

          generatePdf(genDocDefinition(dataPdf), 'pdf', 'view');
        };
        callAPI();
        return () => {
          callAPI();
        };
      };

    const handleSetActive = (id: string) => {
      SetActiveToBuild(id);
    }

    const handleDelete = (id: string) => {
        DeleteRepairCar(id);
    };
    const handleOnClickCreate = (record:any) => {
         setRecord(record);

        setVisible(!visible);
    };

    const handleCloseCreate = () => {
      setVisible(!visible);
  };
  
    const handleOnClickUpdate = (record:any) => {
        setRecord(record);
        setVisibleUpdate(!visibleUpdate);
    };

    const handleCloseUpdate = () => {
      setVisibleUpdate(!visibleUpdate);
  };

  
    const handleOnClickDetail = (record:any) => {
        setRecord(record);
        setVisibleDetail(!visibleDetail);
    };
    
    
  
    const handleCloseDetail = () => {
        setVisibleDetail(!visibleDetail);
    };
  
    const onSearch = (valueSearch:any) => {
      pagination.name = valueSearch;
      console.log(pagination);
      
      GetDataRepair(pagination);
    };

    return(
        <>
        { visible && <Modal
        title="sửa hóa đơn báo giá"
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => {
          setVisible(!visible);
        }}
        width={900}
        open={visible}
        children={<RepairCarUpdate record={record} handleCloseUpdate={handleCloseCreate} />}
        footer={null}
        destroyOnClose={true}
      />}
      { visibleUpdate && <Modal
        title="Thêm mới phiếu sửa chữa"
        onOk={() => {
          setVisibleUpdate(!visibleUpdate);
        }}
        onCancel={() => {
          setVisibleUpdate(!visibleUpdate);
        }}
        width={900}
        open={visibleUpdate}
        children={<RepairCarCreate record={record} handleCloseUpdate={handleCloseUpdate} />}
        footer={null}
        destroyOnClose={true}
      />}
      {/* { visibleDetail && <Modal
        title="Xem chi tiết khách hàng"
        onOk={() => {
          setVisibleDetail(!visibleDetail);
        }}
        onCancel={() => {
          setVisibleDetail(!visibleDetail);
        }}
        width={900}
        open={visibleDetail}
        children={<ReceiveCarDetail record={record} handleCloseDetail={handleCloseDetail} />}
        footer={null}
        destroyOnClose={true}
      />} */}
        <Card title= "Phiếu sửa chữa"
        // extra={(<Button type="primary" icon={<PlusOutlined />} 
        // onClick={handleOnClickCreate}
        // >
        //   Thêm mới
        // </Button>)}
      >
        <Row>
          <Col md={15}></Col>
          <Col md={9}>
            <Search placeholder="tìm kiếm biển số xe" onSearch={onSearch} enterButton />
          </Col>
        </Row>
        &nbsp; &nbsp;
        &nbsp; &nbsp;
        <Table
            columns={columns}
            dataSource={ReceiveCarList}
            pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
            total: totalItems,
            }}
            onChange={onChangePagination}
            bordered
        />
        </Card>
      </>
    )
}
export default RepairCar;