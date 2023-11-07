import { Button, Col, Form, Input, Row } from "antd";
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import SupplierHooks from "./hook";
import { useEffect } from "react";

interface Props {
    id: string;
    handleCloseDetail: () => void;
}

function SupplierDetail({id, handleCloseDetail }: Props) {
    const [formModal] = Form.useForm();
    const {
        GetCustomer
    } = SupplierHooks();

    useEffect(() => {
        loadData(id);
      }, [id]);
      const loadData = async (id:any) => {
        const a = await GetCustomer(id);
        const Entity = a.data;
        formModal.setFieldValue('name', Entity.name);
        formModal.setFieldValue('address', Entity.address);
        formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
        formModal.setFieldValue('email', Entity.email);
      }

    return(
        <>
            <Form layout="vertical" form={formModal}>
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
                    <Input disabled/>
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
                    <Input disabled/>
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={14}>
                    <Form.Item name="address" label="địa chỉ"
                    rules={[
                    
                    ]}>
                    <Input disabled/>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item name="email" label="email"
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
    )
}
export default SupplierDetail;