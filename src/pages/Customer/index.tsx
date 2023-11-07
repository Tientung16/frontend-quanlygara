import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Search from 'antd/lib/input/Search';
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    HistoryOutlined
  } from '@ant-design/icons';
  import "./customer.css"
import Notification from "../NoticationCustom";
import CustomerCreate from "./customer-create";
import CustomerUpdate from "./customer-update";
import CustomerDetail from "./customer-detail";
import CustomerHooks from "./hook";
import CustomerHistory from "./customer-history";
const Customer = () => {
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleHistory, setVisibleHistory] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [customerID, setCustomerID] = useState(String);
  const {
    GetDataSearch,
    DeleteCustomer,
    GetCustomerTotalItems,
    CustomerList,
    // totalItems,
    updateSuccess
  } = CustomerHooks();
  

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    name:"",
  });
  const { current, pageSize , name} = pagination;
  const onChangePagination = (paginationChange:any) => {
    
    const { current, pageSize } = paginationChange;
    setPagination({ ...pagination, current, pageSize });
  };
  useEffect(() => {
    loadTotalPage()
  },[])

  const loadTotalPage = async () => {
    const total = await GetCustomerTotalItems()
    console.log('total',total);
    
    setTotalItems(total.data)
  }

  useEffect(() => {
    
    GetDataSearch(pagination);
  },[current, pageSize,name,updateSuccess])
  const columns: TableColumnsType<any> = [
      {
        title: "stt",
        align: 'center',
        render: (option, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Tên",
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
      },
      {
        title: "Địa chỉ",
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
      },
      {
        title:"số điện thoại",
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
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
                <Tooltip
                  placement="top"
                  title={'Chi tiết lịch sử'}>
                  <Button
                    icon={<HistoryOutlined />}
                    className='btn-green'
                    shape="circle"
                    onClick={() => {
                      handleOnClickHistory(record.id)
                    }}
                  />
                </Tooltip>
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
    DeleteCustomer(id);
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

  const handleOnClickHistory = (id:any) => {
    setCustomerID(id);
    setVisibleHistory(!visibleHistory);
  };
  const handleCloseHistory = () => {
    setVisibleHistory(!visibleHistory);
  };

  const onSearch = (valueSearch:any) => {
    pagination.name = valueSearch;
    
    GetDataSearch(pagination);
  };
  return (
      <>
        {/* { visible && <Modal
        title="Thêm mới khách hàng"
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => {
          setVisible(!visible);
        }}
        width={900}
        open={visible}
        children={<CustomerCreate handleCloseCreate={handleOnClickCreate} />}
        footer={null}
        destroyOnClose={true}
      />} */}
      { visibleUpdate && <Modal
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
      />}
      { visibleDetail && <Modal
        title="Xem chi tiết khách hàng"
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
      />}

      { visibleHistory && <Modal
        title="lịch sử sửa chữa khách hàng"
        onOk={() => {
          setVisibleHistory(!visibleHistory);
        }}
        onCancel={() => {
          setVisibleHistory(!visibleHistory);
        }}
        width={900}
        open={visibleHistory}
        children={<CustomerHistory id={customerID} handleCloseHistory={handleCloseHistory} />}
        footer={null}
        destroyOnClose={true}
      />}
        <Card title= "Thông tin khách hàng"
        // extra={(<Button type="primary" icon={<PlusOutlined />} 
        // onClick={handleOnClickCreate}
        // >
        //   Thêm mới
        // </Button>)}
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
            dataSource={CustomerList}
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
export default Customer;