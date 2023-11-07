import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import AccessoryHooks from "./hook";
import { useEffect, useState } from "react";
import Notification from "../NoticationCustom";

import Search from 'antd/lib/input/Search';
import AccessoryCreate from "./accessory-create";
import AccessoryDetail from "./accessory-detail";
import AccessoryUpdate from "./accessory-update";

const Accessory = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [totalItems, setTotalItems] = useState();
    const [accessoryID, setAccessoryID] = useState(String);
    const {
      GetDataSearch,
      DeleteAccessory,
      GetEntityTotalPage,
      accessoryList,
      // totalItems,
      updateSuccess
    } = AccessoryHooks();

    useEffect(() => {
      loadTotalPage()
    },[])
  
    const loadTotalPage = async () => {
      const total = await GetEntityTotalPage()
      console.log('total',total.data);
      
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
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
          },
        {
          title: "Đơn giá",
          dataIndex: 'cost',
          key: 'cost',
          align: 'center',
          render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
        },
        {
            title: "Số lượng",
            dataIndex: 'number',
            key: 'number',
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
        DeleteAccessory(id);
    };
    const handleOnClickCreate = () => {
    setVisible(!visible);
    };
  
    const handleOnClickUpdate = (id:any) => {
        setAccessoryID(id);
        setVisibleUpdate(!visibleUpdate);
    };
  
    const handleOnClickDetail = (id:any) => {
        setAccessoryID(id);
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
    return (
        <>
        { visible && <Modal
            title="Thêm mới phụ tùng thay thế"
            onOk={() => {
            setVisible(!visible);
            }}
            onCancel={() => {
            setVisible(!visible);
            }}
            width={900}
            open={visible}
            children={<AccessoryCreate handleCloseCreate={handleOnClickCreate} />}
            footer={null}
            destroyOnClose={true}
        />}
        { visibleUpdate && <Modal
            title="cập nhật phụ tùng thay thế"
            onOk={() => {
            setVisibleUpdate(!visibleUpdate);
            }}
            onCancel={() => {
            setVisibleUpdate(!visibleUpdate);
            }}
            width={900}
            open={visibleUpdate}
            children={<AccessoryUpdate id={accessoryID} handleCloseUpdate={handleCloseUpdate} />}
            footer={null}
            destroyOnClose={true}
        />}
        { visibleDetail && <Modal
            title="chi tiết phụ tùng thay thế"
            onOk={() => {
            setVisibleDetail(!visibleDetail);
            }}
            onCancel={() => {
            setVisibleDetail(!visibleDetail);
            }}
            width={900}
            open={visibleDetail}
            children={<AccessoryDetail id={accessoryID} handleCloseDetail={handleCloseDetail} />}
            footer={null}
            destroyOnClose={true}
        />}
            <Card title= "Thông tin phụ tùng thay thế"
            extra={(<Button type="primary" icon={<PlusOutlined />} 
            onClick={handleOnClickCreate}
            >
            Thêm mới
            </Button>)}
        >
            <Row>
            <Col md={15}></Col>
            <Col md={9}>
                <Search placeholder="tìm kiếm tên Hãng xe" onSearch={onSearch} enterButton />
            </Col>
            </Row>
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            <Table
                columns={columns}
                dataSource={accessoryList}
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
export default Accessory;