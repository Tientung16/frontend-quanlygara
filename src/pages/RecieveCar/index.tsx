import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import { useEffect, useState } from "react";
import ReceiveHooks from "./hook";
import Search from 'antd/lib/input/Search';
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SendOutlined
} from '@ant-design/icons';
import Notification from "../NoticationCustom";
import ReceiveCarCreate from "./recieverCar-create";
import ReceiveCarDetail from "./recieveCar-detail";
import CustomerHooks from "../Customer/hook";
import ReceiveCarUpdate from "./recieveCar-update";

const ReceiveCar = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [totalItems, setTotalItems] = useState();
    const [receiveCarID, setReceiveCarID] = useState(String);
    const [record, setRecord] = useState();
    const {
        GetDataSearch,
        DeleteReceiveCar,
        GetEntityTotalPage,
        ReceiveCarList,
        // totalItems,
        updateSuccess,
        SetActiveToRepair
      } = ReceiveHooks();
    const {
      GetCustomer,
    } = CustomerHooks();
    useEffect(() => {
      loadTotalPage()
    },[])
  
    const loadTotalPage = async () => {
      const total = await GetEntityTotalPage()
      console.log('total',total);
      
      setTotalItems(total.data)
    }
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
    
    GetDataSearch(pagination);
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
                    <Tooltip placement="top" title="cập nhật">
                      <Button
                        icon={<EditOutlined />}
                        className="btn-edit"
                        shape="circle"
                        onClick={() => {                        
                          handleOnClickUpdate(record);
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
                    <Tooltip placement="top" title="Gửi">
                    <Button
                      className="btn-edit"
                      onClick={() => handleSetActive(record?.id)}
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

    const handleSetActive = (id: string) => {
      SetActiveToRepair(id);
    }
  
    const handleDelete = (id: string) => {
        DeleteReceiveCar(id);
    };
    const handleOnClickCreate = () => {
        setVisible(!visible);
    };
  
    const handleOnClickUpdate = (record:any) => {
        setRecord(record);
        setVisibleUpdate(!visibleUpdate);
    };
  
    const handleOnClickDetail = (record:any) => {
        setRecord(record);
        setVisibleDetail(!visibleDetail);
    };
    const handleCloseUpdate = () => {
        setVisibleUpdate(!visibleUpdate);
    };
  
    const handleCloseDetail = () => {
        setVisibleDetail(!visibleDetail);
    };
  
    const onSearch = (valueSearch:any) => {
      pagination.name = valueSearch;
      console.log(pagination);
      
      GetDataSearch(pagination);
    };

    return(
        <>
        { visible && <Modal
        title="Thêm mới phiếu tiếp nhận"
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => {
          setVisible(!visible);
        }}
        width={900}
        open={visible}
        children={<ReceiveCarCreate handleCloseCreate={handleOnClickCreate} />}
        footer={null}
        destroyOnClose={true}
      />}
      { visibleUpdate && <Modal
        title="cập nhật phiếu tiếp nhận"
        onOk={() => {
          setVisibleUpdate(!visibleUpdate);
        }}
        onCancel={() => {
          setVisibleUpdate(!visibleUpdate);
        }}
        width={900}
        open={visibleUpdate}
        children={<ReceiveCarUpdate record={record} handleCloseUpdate={handleCloseUpdate} />}
        footer={null}
        destroyOnClose={true}
      />}
      { visibleDetail && <Modal
        title="Xem chi tiết phiếu tiếp nhận"
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
      />}
        <Card title= "Phiếu tiếp nhận xe"
        extra={(<Button type="primary" icon={<PlusOutlined />} 
        onClick={handleOnClickCreate}
        >
          Thêm mới
        </Button>)}
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
export default ReceiveCar;