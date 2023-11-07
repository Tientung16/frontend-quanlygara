import { Button, Col, Form, Input, Row } from "antd";
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import SupplierHooks from "./hook";
import { useEffect } from "react";

interface Props {
    id: string;
    handleCloseUpdate: () => void;
}

function SupplierUpdate({id, handleCloseUpdate }: Props) {
    const [formModal] = Form.useForm();
  const {
    GetCustomer,
    UpdateCustomer,
    updateSuccess
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
    const a = await GetCustomer(id);
    const Entity = a.data;
    const dataUpdate = {
      id:Entity.id,
      ...values,
    };
    console.log('dataUpdate',dataUpdate);

    UpdateCustomer(dataUpdate);
  };
    return( <>
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
                
                ]}>
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
    </>)
}
export default SupplierUpdate;