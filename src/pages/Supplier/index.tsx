import { useEffect, useState } from "react";
import SupplierHooks from "./hook";
import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import Notification from "../NoticationCustom";
import Search from "antd/lib/input/Search";
import SupplierCreate from "./supplier-create";
import SupplierDetail from "./supplier-detail";
import SupplierUpdate from "./supplier-update";

function Supplier() {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [totalItems, setTotalItems] = useState();

    const [supplierID, setSupplierID] = useState(String);
    const {
        GetDataSearch,
        DeleteCustomer,
        GetSupplierTotalItems,
        SupplierList,
        // totalItems,
        updateSuccess
    } = SupplierHooks();

    useEffect(() => {
      loadTotalPage()
    },[])
  
    const loadTotalPage = async () => {
      const total = await GetSupplierTotalItems()
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
          title:"email",
          dataIndex: 'email',
          key: 'email',
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
    DeleteCustomer(id);
    };
    const handleOnClickCreate = () => {
    setVisible(!visible);
    };

    const handleOnClickUpdate = (id:any) => {
    setSupplierID(id);
    setVisibleUpdate(!visibleUpdate);
    };

    const handleOnClickDetail = (id:any) => {
    setSupplierID(id);
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
            title="Thêm mới nhà cung cấp"
            onOk={() => {
                setVisible(!visible);
            }}
            onCancel={() => {
                setVisible(!visible);
            }}
            width={900}
            open={visible}
            children={<SupplierCreate handleCloseCreate={handleOnClickCreate} />}
            footer={null}
            destroyOnClose={true}
            />}
            { visibleUpdate && <Modal
            title="cập nhật nhà cung cấp"
            onOk={() => {
                setVisibleUpdate(!visibleUpdate);
            }}
            onCancel={() => {
                setVisibleUpdate(!visibleUpdate);
            }}
            width={900}
            open={visibleUpdate}
            children={<SupplierUpdate id={supplierID} handleCloseUpdate={handleCloseUpdate} />}
            footer={null}
            destroyOnClose={true}
            />}
            { visibleDetail && <Modal
            title="cập nhật nhà cung cấp"
            onOk={() => {
                setVisibleDetail(!visibleDetail);
            }}
            onCancel={() => {
                setVisibleDetail(!visibleDetail);
            }}
            width={900}
            open={visibleDetail}
            children={<SupplierDetail id={supplierID} handleCloseDetail={handleCloseDetail} />}
            footer={null}
            destroyOnClose={true}
            />}
            <Card title= "Thông tin nhà cung cấp"
            extra={(<Button type="primary" icon={<PlusOutlined />} 
            onClick={handleOnClickCreate}
            >
                Thêm mới
            </Button>)}
            >
            <Row>
                <Col md={15}></Col>
                <Col md={9}>
                <Search placeholder="tìm kiếm tên nhà cung cấp" onSearch={onSearch} enterButton />
                </Col>
            </Row>
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            <Table
                columns={columns}
                dataSource={SupplierList}
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
export default Supplier;