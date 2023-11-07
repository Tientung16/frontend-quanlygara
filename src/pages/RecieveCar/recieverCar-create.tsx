import { Button, Col, DatePicker, Form, Input, Row, Select, } from "antd";
import ReceiveHooks from "./hook";
import { useEffect } from "react";
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import SupplierHooks from "../Supplier/hook";
import CustomerHooks from "../Customer/hook";
import AutomakerHooks from "../Automaker/hook";
import moment from "moment";

interface Props {
    handleCloseCreate: () => void;
  }
function ReceiveCarCreate({ handleCloseCreate }: Props) {
    const [formModal] = Form.useForm();
  const {
    CreateReceiveCar,
    updateSuccess
  } = ReceiveHooks();
  const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();
  const { GetDataSelectAutomaker, ListComboboxAutomaker,} = AutomakerHooks();
  const {
    GetEntityByPhone,
  } = CustomerHooks();
  useEffect(() => {
    GetDataSelectAutomaker();
  },[])
  useEffect(() => {
    if (updateSuccess) {
      formModal.resetFields();
      handleCloseCreate();
    }
  }, [updateSuccess]);
  const onFinish = (values:any) => {
    const customer = {
      name: values.nameCustomer,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };
    const dataUpdateReceiveCar = {
      customer,
      licensePlates: values.licensePlates,
      idAutomaker: values.idAutomaker,
      dateReceive: moment(values.dateReceive),
      
    };
    
    CreateReceiveCar(dataUpdateReceiveCar);
  };

  const handleBumber = async (value:any) => {
    console.log('value',value);
    
    if(value.length === 10){
      console.log('valueOk');
      const a = await GetEntityByPhone(value);
      const Entity = a.data;
      console.log('Entity',Entity);
      
      formModal.setFieldValue('nameCustomer', Entity.name);
      formModal.setFieldValue('address', Entity.address);
      formModal.setFieldValue('phoneNumber', Entity.phoneNumber);
    }
  }

  return (
    <>
      <Form layout="vertical" form={formModal} onFinish={onFinish}>
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameCustomer"
              label= "Tên khách hàng"
              rules={[
                {
                  required: true,
                  message:  "không được để trống",
                },
              ]}
            >
              <Input />
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
              <DatePicker style={{ width: "100%" }}/>
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
              <Input />
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
              <Input onChange={e => {
                              const { value } = e.target;
                              handleBumber(value);
                          }}/>
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
export default ReceiveCarCreate;