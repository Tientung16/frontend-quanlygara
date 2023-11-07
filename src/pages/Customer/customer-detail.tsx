import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CustomerHooks from './hook';
// import { AREA_LEVEL, AUDITINFO } from 'app/config/constants';
// import CommonHooks from 'app/entities/Hooks';
// import AuditInfo from 'app/shared/components/AuditInfo';
// import { translate, Translate } from 'react-jhipster';
// import CommuneHooks from './Hooks';
// import { dataToSelectBox, filterOption } from 'app/shared/util/base-utils';

interface Props {
    id: string;
    handleCloseDetail: () => void;
}

function CustomerDetail({id, handleCloseDetail }: Props) {
  const [formModal] = Form.useForm();
  const {
    GetCustomer,
  } = CustomerHooks();
  
  useEffect(() => {
    loadData(id);
  }, [id]);
  const loadData = async (id:any) => {
    const a = await GetCustomer(id);
    const Entity = a.data;
    formModal.setFieldValue('name', Entity.name);
    formModal.setFieldValue('address', Entity.address);
    formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
  }

  // useEffect(() => {  
  //   formModal.setFieldsValue({ ...Entity});
    

  // }, [id]);
  const onFinish = (values:any) => {
    
  };
  return (
    <>
      <Form layout="vertical" form={formModal} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                
              ]}
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="phoneNumber"
              label= "số điện thoại"
              rules={[
               
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="address" label="địa chỉ"
            rules={[
            
            ]}>
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>
        
        <div >
          <Button style={{float:"right"}} icon={<CloseOutlined />} onClick={handleCloseDetail}>
            Đóng
          </Button>
          &nbsp; &nbsp;
          &nbsp; &nbsp;

        </div>
      </Form>
    </>
  );
}
export default CustomerDetail;
