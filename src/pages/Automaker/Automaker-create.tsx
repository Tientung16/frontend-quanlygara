import { Button, Col, Form, Input,  Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import AutomakerHooks from './hook';
// import { AREA_LEVEL, AUDITINFO } from 'app/config/constants';
// import CommonHooks from 'app/entities/Hooks';
// import AuditInfo from 'app/shared/components/AuditInfo';
// import { translate, Translate } from 'react-jhipster';
// import CommuneHooks from './Hooks';
// import { dataToSelectBox, filterOption } from 'app/shared/util/base-utils';

interface Props {
  handleCloseCreate: () => void;
}

function AutomakerCreate({ handleCloseCreate }: Props) {
  const [formModal] = Form.useForm();
  const {
    CreateAutomaker,
    updateSuccess
  } = AutomakerHooks();
  
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
    CreateAutomaker(dataUpdate);
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
                <Input />
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
export default AutomakerCreate;
