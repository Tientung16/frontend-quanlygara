import { Button, Card, Col, Modal, Row, Space, Table, TableColumnsType, Tooltip } from "antd";
import {
    InfoOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import AutomakerHooks from "./hook";
import { useEffect, useState } from "react";
import Notification from "../NoticationCustom";
import AutomakerCreate from "./Automaker-create";
import AutomakerUpdate from "./Automaker-update";
import AutomakerDetail from "./Automaker-detail";
import Search from 'antd/lib/input/Search';

const Automaker = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [totalItems, setTotalItems] = useState();
    const [customerID, setAutomakerID] = useState(String);
    const {
      GetDataSearch,
      DeleteAutomaker,
      getEntityTotal,
      AutomakerList,
      // totalItems,
      updateSuccess
    } = AutomakerHooks();

    useEffect(() => {
      loadTotalPage()
    },[])
  
    const loadTotalPage = async () => {
      const total = await getEntityTotal()
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
            title: "Mã",
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
          },
        {
          title: "Tên",
          dataIndex: 'name',
          key: 'name',
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
        DeleteAutomaker(id);
    };
    const handleOnClickCreate = () => {
    setVisible(!visible);
    };
  
    const handleOnClickUpdate = (id:any) => {
        setAutomakerID(id);
        setVisibleUpdate(!visibleUpdate);
    };
  
    const handleOnClickDetail = (id:any) => {
        setAutomakerID(id);
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
            title="Thêm mới hãng xe"
            onOk={() => {
            setVisible(!visible);
            }}
            onCancel={() => {
            setVisible(!visible);
            }}
            width={900}
            open={visible}
            children={<AutomakerCreate handleCloseCreate={handleOnClickCreate} />}
            footer={null}
            destroyOnClose={true}
        />}
        { visibleUpdate && <Modal
            title="cập nhật hãng xe"
            onOk={() => {
            setVisibleUpdate(!visibleUpdate);
            }}
            onCancel={() => {
            setVisibleUpdate(!visibleUpdate);
            }}
            width={900}
            open={visibleUpdate}
            children={<AutomakerUpdate id={customerID} handleCloseUpdate={handleCloseUpdate} />}
            footer={null}
            destroyOnClose={true}
        />}
        { visibleDetail && <Modal
            title="cập nhật hãng xe"
            onOk={() => {
            setVisibleDetail(!visibleDetail);
            }}
            onCancel={() => {
            setVisibleDetail(!visibleDetail);
            }}
            width={900}
            open={visibleDetail}
            children={<AutomakerDetail id={customerID} handleCloseDetail={handleCloseDetail} />}
            footer={null}
            destroyOnClose={true}
        />}
            <Card title= "Thông tin hãng xe"
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
                dataSource={AutomakerList}
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
export default Automaker;