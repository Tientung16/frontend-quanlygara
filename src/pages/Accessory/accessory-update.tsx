import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CustomerHooks from './hook';
import AutomakerHooks from './hook';
import AccessoryHooks from './hook';
import SupplierHooks from '../Supplier/hook';
// import { AREA_LEVEL, AUDITINFO } from 'app/config/constants';
// import CommonHooks from 'app/entities/Hooks';
// import AuditInfo from 'app/shared/components/AuditInfo';
// import { translate, Translate } from 'react-jhipster';
// import CommuneHooks from './Hooks';
// import { dataToSelectBox, filterOption } from 'app/shared/util/base-utils';

interface Props {
    id: string;
    handleCloseUpdate: () => void;
}

function AccessoryUpdate({id, handleCloseUpdate }: Props) {
  const [formModal] = Form.useForm();

  const {
    GetAccessory,
    updateSuccess,
    UpdateAccessory
  } = AccessoryHooks();
  const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();
  useEffect(() => {
    GetDataSelectSupplier();
    loadData(id);
  }, [id]);
  const loadData = async (id:any) => {
    const a = await GetAccessory(id);
    const Entity = a.data;
    formModal.setFieldValue('name', Entity.name);
    formModal.setFieldValue('cost', Entity.cost);
    formModal.setFieldValue('codeSupplier', Entity.codeSupplier);
    formModal.setFieldValue('number', Entity.number);
    formModal.setFieldValue('guarantee', Entity.guarantee);

  }
  // useEffect(() => {  
  //   console.log('Entity',Entity);
    
  //   formModal.setFieldsValue({ ...Entity});
  // }, [id]);

  useEffect(() => {
    if (updateSuccess) {
      formModal.resetFields();
      handleCloseUpdate();
    }
  }, [updateSuccess]);
  const onFinish = async (values:any) => {
    const a = await GetAccessory(id);
    const Entity = a.data;
    const dataUpdate = {
      id:Entity.id,
      ...values,
    };
    console.log('dataUpdate',dataUpdate);

    UpdateAccessory(dataUpdate);
  };
  return (
    <>
      <Form layout="vertical" form={formModal} onFinish={onFinish}>
      <Row gutter={24}>
            <Col span={8}>
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
                <Input />
                </Form.Item>
            </Col>        
            <Col span={16}>
                <Form.Item
                name="cost"
                label="Đơn giá"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
                <Input />
                </Form.Item>
            </Col>        
        </Row>
        <Row gutter={24}>
            <Col span={8}>
                <Form.Item
                name="number"
                label="Số lượng"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
                <Input />
                </Form.Item>
            </Col>        
            <Col span={16}>
                <Form.Item
                name="codeSupplier"
                label="Nhà cung cấp"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
                <Select
                                showSearch
                                // style={{ width: '100%' }}
                                options={ListComboboxSupplier}
                                
                                
                            />
                </Form.Item>
            </Col>        
        </Row>
        <Row gutter={24}>
            <Col span={8}>
            <Form.Item
                name="guarantee"
                label="Thời hạn bảo hành"
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                ]}
                >
                <Input />
                </Form.Item>
            </Col>
        </Row>
        <div >
          <Button style={{float:"right"}} icon={<CloseOutlined />} onClick={handleCloseUpdate}>
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
export default AccessoryUpdate