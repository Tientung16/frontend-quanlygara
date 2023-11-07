import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import SupplierHooks from "../Supplier/hook";
import { useEffect } from "react";
import CustomerHooks from "../Customer/hook";
import ReceiveHooks from "./hook";
import moment from 'moment';
import AutomakerHooks from "../Automaker/hook";

interface Props {
    record: any;
    handleCloseDetail: () => void;
}

function ReceiveCarDetail({record, handleCloseDetail }: Props) {
    const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();
  const { GetDataSelectAutomaker, ListComboboxAutomaker,} = AutomakerHooks();

    const [formModal] = Form.useForm();
    const {
        GetCustomer,
    } = CustomerHooks();
    const {
        GetReceiveCar,
        
    } = ReceiveHooks();
    useEffect(() => {
        GetDataSelectAutomaker()
    loadData(record)
    }, [record]);
    console.log('aa',record);
    
    const loadData = async (record:any) => {
        // const a = await GetCustomer(id);
        // const Entity = a.data;
        // formModal.setFieldValue('address', Entity.address);
        // formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
        const b = await GetReceiveCar(record.id);
        const EntityV2 = b.data;
        formModal.setFieldValue('dateReceive', moment(EntityV2.dateReceive));
        formModal.setFieldValue('idAutomaker', EntityV2.idAutomaker);
        formModal.setFieldValue('licensePlates', EntityV2.licensePlates);
        // formModal.setFieldValue('nameCustomer', EntityV2.nameCustomer);
        const a = await GetCustomer(record.idCustomer);
        const Entity = a.data;
        formModal.setFieldValue('address', Entity.address);
        formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
        formModal.setFieldValue('name', Entity.name);
    }
    return (
        <>
        <Form layout="vertical" form={formModal} >
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                name="licensePlates"
                label="Biển số xe"
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
            <Col span={12}>
                <Form.Item
                name="name"
                label= "Tên khách hàng"
                rules={[
                    {
                    required: true,
                    message:  "không được để trống",
                    },
                ]}
                >
                <Input disabled/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item name="dateReceive" label="Ngày nhập"
                rules={[
                {
                    required: true,
                    message:  "không được để trống",
                },
                ]}>
                <DatePicker style={{ width: "100%" }} disabled/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="address" label="địa chỉ"
                rules={[
                {
                    required: true,
                    message:  "không được để trống",
                },
                ]}>
                <Input disabled/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item name="idAutomaker" label="Hãng xe"
                rules={[
                {
                    required: true,
                    message:  "không được để trống",
                },
                ]}>
                <Select
                                    showSearch
                                    // style={{ width: '100%' }}
                                    options={ListComboboxAutomaker}
                                    
                                    disabled
                                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="phoneNumber" label="Số điện thoại"
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
export default ReceiveCarDetail;