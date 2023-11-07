import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Table, TableColumnsType, Tooltip, } from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, ExclamationCircleOutlined, SaveOutlined,FormOutlined,DeleteOutlined,MinusCircleFilled,PlusOutlined } from '@ant-design/icons';
import SupplierHooks from "../Supplier/hook";
import CustomerHooks from "../Customer/hook";
import RepairHooks from "./hook";
import moment from "moment";
import ReceiveHooks from "../RecieveCar/hook";
import Notification from "../NoticationCustom";
import { isEmpty, isUndefined } from "lodash";
import AccessoryHooks from "../Accessory/hook";
import AutomakerHooks from "../Automaker/hook";

interface Props {
    record: any
    handleCloseUpdate: () => void;
  }
function RepairCarCreate({ record,handleCloseUpdate }: Props) {
  const {GetDataSelectSupplier,ListComboboxSupplier} = SupplierHooks();
  const { GetDataSelectAutomaker, ListComboboxAutomaker,} = AutomakerHooks();

    const [formModal] = Form.useForm();
    const {
        GetCustomer,
    } = CustomerHooks();
    const {
        GetReceiveCar,
    } = ReceiveHooks();
    const {
      GetRepairCar,
      CreateRepairCar,
      updateSuccess
    } = RepairHooks();
    const{GetDataSelectAccessory,listComboboxAccessory} = AccessoryHooks();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<any>([]);
    console.log('listComboboxAccessory',listComboboxAccessory);
    
    useEffect(() => {
      GetDataSelectAutomaker()
    GetDataSelectAccessory()
    loadData(record)
    }, [record]);
    console.log('record',record);
    
    
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

        // const result = await GetRepairCar(record.id);
        // const EntityRepairCar = a.data;
        // console.log('result',result.data);
        // formModal.setFieldValue('dateRepair', moment(EntityRepairCar.dateRepair));
        // formModal.setFieldValue('wage', EntityRepairCar.wage);
        
        // const dataF = result.data;

        // const dataConvert = result.data.map((item:any, index:any) => {
        //     return {
        //         key: index+1 ,
        //         ...item
        //     }
        // })

        // setDataSource(dataConvert)
        setDataSource([])
    }
    
    
    const handleChangeData = (indexChange:any, nameChange:any, valueChange:any) => {

      const dataClone = [...dataSource];
      if (indexChange > -1) {
          const item = dataClone[indexChange];
          dataClone.splice(indexChange, 1, {

          ...item,
          [nameChange]: valueChange,
        });
        } 
        setDataSource(dataClone);
      }
    const columns: TableColumnsType<any> = [
        
      {
          title: 'STT', align: 'center', width: 10, render: (option, record, index) => (
              <span>
                  {index + 1}
              </span>
          ),
      },
      {
          title: 'Tên dịch vụ', align: 'center', dataIndex: 'idAccessory', key: 'idAccessory',
          render(filedName,record,index) {
            formModal.setFieldValue(`idAccessory-${index}`, filedName);          
              return (
                  <>
                      <Form.Item name={[`idAccessory-${index}`]}
                          rules={[
                              {
                              required: true,
                              message: 'Trường này không được để trống !',
                              whitespace: true,
                              },
                          ]}
                      >
                          <Select
                              showSearch
                              // style={{ width: '100%' }}
                              options={listComboboxAccessory}
                              value={record[`idAccessory-${index}`]}
                              onChange={(value,option) => {
                                  handleChangeData(index, 'idAccessory', value);
                              }}
                          />
                      </Form.Item>
                  </>
                 
              )
          }
      },
      {
          title: "Số lượng", align: 'center', dataIndex: 'number', key: 'number',
          render(orderIndex,record,index) {
            formModal.setFieldValue(`number-${index}`, orderIndex);
              return (
              <>
                  <Form.Item name={[`number-${index}`]}
                      rules={[
                          {
                          required: true,
                          message: 'Trường này không được để trống !',
                          whitespace: true,
                          },
                      ]}
                  >
                      <Input style={{ width: '50%' }} value={record[`number-${index}`]} 
                          onChange={e => {
                              const { value } = e.target;
                              console.log('value',value);
                              
                              handleChangeData(index, 'number', value);
                          }}
                      />
                  </Form.Item>
              </>
                  
              )
          }
      },
      {
        title: "Nội dung", align: 'center', dataIndex: 'content', key: 'content',
        render(orderIndex,record,index) {
          formModal.setFieldValue(`content-${index}`, orderIndex);
            return (
            <>
                <Form.Item name={[`content-${index}`]}
                    rules={[
                        {
                        required: true,
                        message: 'Trường này không được để trống !',
                        whitespace: true,
                        },
                    ]}
                >
                    <Input style={{ width: '50%' }} value={record[`content-${index}`]} 
                        onChange={e => {
                            const { value } = e.target;

                            handleChangeData(index, 'content', value);
                        }}
                    />
                </Form.Item>
            </>
                
            )
        }
    },
      {
          title: "Thao tác", align: 'center', render(value, record, index) {
              
            return( 
            <Row  align="middle">
              
              <Notification
                  keyProp={record?.id}
                  type='warning'
                  // disabled = {isUndefined(record.id)}
                  className='btn-delete'
                  message='a'
                  description='a'
                  titleTooltip='a'
                  onAccept={() => {
                      
                      handleDeleteRow(index);
                          // const arr = [record?.id]
                          // DeletePortalDisplayConfig(arr)
                          // const newData = dataSource.filter((item, indexItem) => indexItem != index);
                          // setDataSource(newData);
                      // }
                      
                  }}
                  onCancel={() => {

                  }}
                  textOK={'Xác nhận'}
                  textCancel={'Đóng'}
                  icon={<DeleteOutlined />
                  } />
              
            </Row>);
          }
        }
  ];

  useEffect(() => {
    if (updateSuccess) {
      formModal.resetFields();
      handleCloseUpdate();
    }
  }, [updateSuccess]);
  const onFinish = (values:any) => {
    const filteredList = listComboboxAccessory.filter((item:any) => dataSource.some((dataItem:any) => dataItem.idAccessory === item.id));
    const filteredList2 = dataSource.filter((item:any) => listComboboxAccessory.some((dataItem:any) => dataItem.idAccessory === item.id));
    console.log('dataSource',dataSource);
    console.log('filteredList',filteredList);
    console.log('filteredList2',filteredList2);
    let total = 0;
    for (let i = 0; i < filteredList.length; i++) {
      total = total + filteredList[i].cost * filteredList2[i].number;
    }
    total = total + parseInt(values.wage);
    console.log('total',total);
    
    const customer = {
      id:record.idCustomer,
      name: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };
    const dataUpdateReceiveCar = {
      customer,
      licensePlates: values.licensePlates,
      idAutomaker: values.idAutomaker,
      idReceive:record.id,
      dateReceive: values.dateReceive,
      dateRepair:values.dateRepair,
      wage:values.wage,
      totalMoney:total,
      repairCarDetail:dataSource
    };
    console.log('dataUpdateReceiveCar',dataUpdateReceiveCar);
    
    CreateRepairCar(dataUpdateReceiveCar);
  };

  const handleAddRow = () => {
    const row = {
        idAccessory: '',
        number: '',
        content:'',
    };
    
    setDataSource([...dataSource, row]);
  };

const handleDeleteRow = (index:any) => {
  const newData = dataSource.filter((item:any, indexItem:any) => indexItem != index);
  setDataSource(newData);
};
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
              name="name"
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
              <Input />
            </Form.Item>
          </Col>
        </Row>


        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="dateRepair" label="Ngày sửa"
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
            <Form.Item name="wage" label="Tiền công"
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



        <Row>
                {/* <Button
                        icon={<PlusOutlined />}
                        className="btn-delete"
                        title="Xóa"
                        disabled={isEmpty(selectedRowKeys)}
                        // shape="circle"
                        onClick={() => {
                            warning()
                            // handleDeleteMulti();
                        }}
                        >Xóa</Button>
                &nbsp;
                &nbsp; */}
                <Button
                    icon={<PlusOutlined />}
                    className="btn-edit"
                    title="Thêm dòng"
                    // shape="circle"
                    onClick={() => {
                        handleAddRow();
                    }}
                    >Thêm mới</Button>
            </Row>
            {/* <div className="text-end"> */}
                {/* <Tooltip placement="top" title={<Translate contentKey="archiveApp.arcCatFond.home.createLabel">Add New</Translate>}> */}
                    
                {/* </Tooltip> */}
            {/* </div> */}
            &nbsp;
            &nbsp;
        <Row >
                <Col xs={24}>
                
                </Col>
                <Col xs={24}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        // rowSelection={rowSelection}
                        pagination = {false}
                        // pagination={{
                        //     ...pagination,
                        //     showSizeChanger: true,
                        //     pageSizeOptions: ['10', '20', '30'],
                        //     total: totalItems,
                        // }}
                        // onChange={onChangePagination}
                    />
                </Col>
            </Row>
            &nbsp; &nbsp;
          &nbsp; &nbsp;
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
export default RepairCarCreate;