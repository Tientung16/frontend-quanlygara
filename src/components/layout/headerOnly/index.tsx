import React, { useState } from "react";
import Header from "../component/header";
import { Button, Col, Form, Input, Row } from "antd";
import "./headerOnly.css"
import Password from "antd/es/input/Password";
import RepairHooks from "../../../pages/repairCar/hook";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

interface Props {
  children:any
}
const HeaderOnly = ({children}:Props) => {
  const [formModal] = Form.useForm();
  // const dispatch = useDispatch();
  const {CheckLogin} = RepairHooks();

//start
const [validateStatusMess, setValidateStatusMess] = useState<any>();
const [ValidateStatus, setValidateStatus] = useState<any>();

//end



  const handleToHome = () => {
    formModal.validateFields().then(async (value) => {
        const dataUpdate = {
          ...value,
        };
        // callApiUpdate(dataUpdate);
        console.log('dataUpdate',dataUpdate);
        const result = await CheckLogin(dataUpdate)
        console.log('result',result);
        if(result.data === true){
          window.location.href = "/Home";
        }else{
          formModal.resetFields();
          setValidateStatus('error')
          setValidateStatusMess("Sai tài khoản hoặc mật khẩu !")
        }
        formModal.resetFields();
    })
    // window.location.href = "/Home"; // Chuyển hướng đến trang Home
  };

  return(
    <Form layout="vertical" form={formModal} >
    <div>
      <div className="container">
    <div className="card">
      <h2>Đăng Nhập</h2>
      <form>
        <div className="form-group">
          {/* <label >Tên đăng nhập:</label>
          <Input  id="username"  /> */}
           <Form.Item
                name="email"
                label="Tên đăng nhập:"
                {...(ValidateStatus ? { validateStatus: ValidateStatus } : {})}
                {...(validateStatusMess ? { help: validateStatusMess } : {})}
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },
                    {
                      // required: true,
                      type: 'email',
                      message: 'Tên đăng nhập không đúng định dạng gmail!',
                    },
                ]}
                >
                <Input id="username"/>
                </Form.Item>
        </div>
        <div className="form-group">
          {/* <label >Mật khẩu:</label>
          <Input id="password"/> */}
          <Form.Item
                name="password"
                label="Mật khẩu:"
                {...(ValidateStatus ? { validateStatus: ValidateStatus } : {})}
                {...(validateStatusMess ? { help: validateStatusMess } : {})}
                rules={[
                    {
                    required: true,
                    message: "không được để trống",
                    },  
                ]}
                >
                <Input.Password id="password" type="password" iconRender={(visible:any) =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
    }/>
                </Form.Item>
        </div>
        <div className ="form-group">
          <Button onClick={handleToHome}>Đăng nhập</Button>
        </div>
      </form>
    </div>
  </div>
    </div>
    </Form>
  );
}

export default HeaderOnly;