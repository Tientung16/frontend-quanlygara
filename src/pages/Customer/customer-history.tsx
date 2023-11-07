import { Button, Col, Form, Input, Modal, Row, Select, Table, TableColumnsType } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CustomerHooks from './hook';
import AccessoryHooks from '../Accessory/hook';
// import { AREA_LEVEL, AUDITINFO } from 'app/config/constants';
// import CommonHooks from 'app/entities/Hooks';
// import AuditInfo from 'app/shared/components/AuditInfo';
// import { translate, Translate } from 'react-jhipster';
// import CommuneHooks from './Hooks';
// import { dataToSelectBox, filterOption } from 'app/shared/util/base-utils';

interface Props {
    id: string;
    handleCloseHistory: () => void;
}

function CustomerHistory({id, handleCloseHistory }: Props) {
  const [formModal] = Form.useForm();
  const {
    GetCustomer,
    GetCustomerHistory
  } = CustomerHooks();
  const [dataSource, setDataSource] = useState<any>([]);
  const{GetDataSelectAccessory,listComboboxAccessory} = AccessoryHooks();

  useEffect(() => {
    loadData(id);
    GetDataSelectAccessory()

  }, [id]);
  const loadData = async (id:any) => {
    const a = await GetCustomerHistory(id);
    const Entity = a.data;
    console.log(Entity);
    
    setDataSource(Entity)
  }
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
  

  const columns: TableColumnsType<any> = [
    {
      title: "stt",
      align: 'center',
      render: (option, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "phụ tùng",
      dataIndex: 'idAccessory',
      key: 'idAccessory',
      align: 'center',
      render(idAccessory,record) {
        console.log('listComboboxAccessory',listComboboxAccessory);
        
        const name = listComboboxAccessory.filter((item:any) => item.id === idAccessory).map((value:any) => {return value.name})
        return name
        },
    },
    {
      title: "Số lượng",
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
    },
    {
      title:"nội dung sửa chữa",
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      render: text => <p style={{ textAlign: 'left' }}>{text}</p>,
    },
  ];
  const onFinish = (values:any) => {
    
  };
  return (
    <>
      <Form layout="vertical" form={formModal} onFinish={onFinish}>
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
            // total: totalItems,
            }}
            onChange={onChangePagination}
            bordered
        />
         &nbsp; &nbsp;
         &nbsp; &nbsp;
        <div >
          <Button style={{float:"right"}} icon={<CloseOutlined />} onClick={handleCloseHistory}>
            Đóng
          </Button>
          &nbsp; &nbsp;
          &nbsp; &nbsp;

        </div>
      </Form>
    </>
  );
}
export default CustomerHistory;
