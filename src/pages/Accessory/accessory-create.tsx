import { Button, Col, Form, Input,  Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
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
  handleCloseCreate: () => void;
}

function AccessoryCreate({ handleCloseCreate }: Props) {
  const [formModal] = Form.useForm();
  const {
    CreateAccessory,
    updateSuccess
  } = AccessoryHooks();

  const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();
  useEffect(() => {
    GetDataSelectSupplier();
    },[])
  useEffect(() => {
    if (updateSuccess) {
      formModal.resetFields();
      handleCloseCreate();
    }
  }, [updateSuccess]);
  const onFinish = (values:any) => {
    const dataUpdate = {
      ...values,
    };
    CreateAccessory(dataUpdate);
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
                                // onChange={(value,option) => {
                                //     // handleChangeData(index, 'fieldCode', option);
                                // }}
                                
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
          <Button style={{float:"right"}} icon={<CloseOutlined />} onClick={handleCloseCreate}>
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
export default AccessoryCreate;
