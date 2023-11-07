import { Button, Col, Form, Input,  Row } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import SupplierHooks from './hook';
import VehicleHooks from './hook';


interface Props {
    handleCloseCreate: () => void;
  }
  
function VehhicleCreate({ handleCloseCreate }: Props) {
    const [formModal] = Form.useForm();
    const {
        CreateVehicle,
        updateSuccess
    } = VehicleHooks();
    
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
        CreateVehicle(dataUpdate);
    };
    return(
        <>
            <Form layout="vertical" form={formModal} onFinish={onFinish}>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                    name="idCustomer"
                    label="Tên khách hàng"
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
                    name="licensePlates"
                    label= "biển số xe"
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
                <Col span={24}>
                    <Form.Item name="codeAutomaker" label="hãng xe"
                    rules={[
                    
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
export default VehhicleCreate;
