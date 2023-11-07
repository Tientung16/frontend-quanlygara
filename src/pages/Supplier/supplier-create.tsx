import { Button, Col, Form, Input,  Row } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import SupplierHooks from './hook';
import { type } from 'os';


interface Props {
    handleCloseCreate: () => void;
  }
  
function SupplierCreate({ handleCloseCreate }: Props) {
    const [formModal] = Form.useForm();
    const {
        CreateCustomer,
        updateSuccess
    } = SupplierHooks();
      
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
        CreateCustomer(dataUpdate);
    };
    return(
        <>
            <Form layout="vertical" form={formModal} onFinish={onFinish}>
                <Row gutter={16}>
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
                    name="phoneNumber"
                    label= "số điện thoại"
                    rules={[
                        {
                        required: true,
                        message:  "không được để trống",
                        },
                        {
                        pattern: /^[0-9]+$/,
                        message: "Vui lòng nhập số",
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={14}>
                    <Form.Item name="address" label="địa chỉ"
                    rules={[
                    
                    ]}>
                    <Input />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item name="email" label="email"
                    rules={[
                        {
                            // required: true,
                            type: 'email',
                            message: 'E-mail không đúng định dạng !',
                          },
                    ]}>
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
    )
}
export default SupplierCreate;
