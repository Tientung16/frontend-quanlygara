import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import Notification from "../NoticationCustom";
import VehicleHooks from "./hook";
import Search from 'antd/lib/input/Search';
import CustomerCreate from "../Customer/customer-create";
import VehhicleCreate from "./Vehicle-create";

const Vehicle = () => {
    const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [customerID, setCustomerID] = useState(String);
  const {
    GetDataSearch,
    DeleteVehicle,
    vehicleList,
    totalItems,
    updateSuccess
  } = VehicleHooks();
  

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    licensePlates:""
  });
  const { current, pageSize , licensePlates} = pagination;
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
      {
        title: "Tên",
        dataIndex: 'idCustomer',
        key: 'idCustomer',
        align: 'center',
        render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
      },
    //   {
    //     title: "hãng xe",
    //     dataIndex: 'codeAutomaker',
    //     key: 'codeAutomaker',
    //     align: 'center',
    //     render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
    //   },
      {
        title:"biển số xe",
        dataIndex: 'licensePlates',
        key: 'licensePlates',
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
                      handleOnClickDetail(record.id);
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
                        handleOnClickUpdate(record.id);
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
              </Space>
            </>
          );
        },
      },
    ];

  const handleDelete = (id: string) => {
    DeleteVehicle(id);
  };
  const handleOnClickCreate = () => {
  setVisible(!visible);
  };

  const handleOnClickUpdate = (id:any) => {
    setCustomerID(id);
    setVisibleUpdate(!visibleUpdate);
  };

  const handleOnClickDetail = (id:any) => {
    setCustomerID(id);
    setVisibleDetail(!visibleDetail);
  };
  const handleCloseUpdate = () => {
    setVisibleUpdate(!visibleUpdate);
  };

  const handleCloseDetail = () => {
    setVisibleDetail(!visibleDetail);
  };

  const onSearch = (valueSearch:any) => {
    pagination.licensePlates = valueSearch;
    console.log(pagination);
    
    GetDataSearch(pagination);
  };
    return(
        <>
            { visible && <Modal
                title="Thêm mới xe khách hàng"
                onOk={() => {
                setVisible(!visible);
                }}
                onCancel={() => {
                setVisible(!visible);
                }}
                width={900}
                open={visible}
                children={<VehhicleCreate handleCloseCreate={handleOnClickCreate} />}
                footer={null}
                destroyOnClose={true}
            />}
            {/* { visibleUpdate && <Modal
                title="cập nhật khách hàng"
                onOk={() => {
                setVisibleUpdate(!visibleUpdate);
                }}
                onCancel={() => {
                setVisibleUpdate(!visibleUpdate);
                }}
                width={900}
                open={visibleUpdate}
                children={<CustomerUpdate id={customerID} handleCloseUpdate={handleCloseUpdate} />}
                footer={null}
                destroyOnClose={true}
            />} */}
            {/* { visibleDetail && <Modal
                title="cập nhật khách hàng"
                onOk={() => {
                setVisibleDetail(!visibleDetail);
                }}
                onCancel={() => {
                setVisibleDetail(!visibleDetail);
                }}
                width={900}
                open={visibleDetail}
                children={<CustomerDetail id={customerID} handleCloseDetail={handleCloseDetail} />}
                footer={null}
                destroyOnClose={true}
            />} */}
            <Card title= "Thông tin xe khách hàng"
            extra={(<Button type="primary" icon={<PlusOutlined />} 
            onClick={handleOnClickCreate}
            >
            Thêm mới
            </Button>)}
        >
            <Row>
            <Col md={15}></Col>
            <Col md={9}>
                <Search placeholder="tìm kiếm tên khách hàng" onSearch={onSearch} enterButton />
            </Col>
            </Row>
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            <Table
                columns={columns}
                dataSource={vehicleList}
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
export default Vehicle;
