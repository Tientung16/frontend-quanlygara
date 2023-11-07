import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CustomerHooks from './hook';
import AutomakerHooks from './hook';
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

function AutomakerDetail({id, handleCloseDetail }: Props) {
  const [formModal] = Form.useForm();
  const {
    GetAutomaker,
  } = AutomakerHooks();
  
  useEffect(() => {
    loadData(id);
  }, [id]);
  const loadData = async (id:any) => {
    const a = await GetAutomaker(id);
    const Entity = a.data;
    formModal.setFieldValue('name', Entity.name);
    formModal.setFieldValue('code', Entity.code);
  }

  // useEffect(() => {  
  //   formModal.setFieldsValue({ ...Entity});
    

  // }, [id]);
  const onFinish = (values:any) => {
    
  };
  return (
    <>
      <Form layout="vertical" form={formModal} onFinish={onFinish}>
      <Row gutter={24}>
            <Col span={8}>
                <Form.Item
                name="code"
                label="Mã"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
                <Input disabled/>
                </Form.Item>
            </Col>        
            <Col span={16}>
                <Form.Item
                name="name"
                label="Tên"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
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
          <Button style={{float:"right", marginRight:"5px"}} icon={<SaveOutlined />} type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </>
  );
}
export default AutomakerDetail;
