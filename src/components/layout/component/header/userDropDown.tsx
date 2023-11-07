import {
  AuditOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Popconfirm } from 'antd'

const UserDropdown = () => {
  return (
    <div style={{ width: '300px', background: 'white' }}>
      {/* Avatar and username */}
      {/* <div
        style={{
          backgroundImage: url("/images/background-user.jpg"),
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '8rem',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '35%',
            fontFamily: 'sans-serif',
            color: 'white',
            fontSize: '1rem'
          }}
        >
          <Avatar
            style={{
              marginLeft: '1rem',
              marginRight: '0.5rem',
              background: '#2EA7F5'
            }}
            shape="square"
            icon={<UserOutlined />}
            size="large"
          />
          <span>{user?.info?.name}</span>
        </div>
      </div> */}
      {/* Menu */}
      {/* <div
        style={{
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#F7F8FA'
        }}
      >
        <div>
          <div
            style={{
              borderBottomStyle: 'solid',
              borderBottomWidth: '1px',
              borderBottomColor: '#F7F8FA',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
          >
            <Button
              type="link"
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => router.push('/user/profile')}
            >
              <AuditOutlined style={{ color: '#0080FF' }} />
              <span>Thông tin tài khoản</span>
            </Button>
          </div>
          <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <Button
              type="link"
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => router.push('/user/change-password')}
            >
              <LockOutlined style={{ color: '#0080FF' }} />
              <span>Thay đổi mật khẩu</span>
            </Button>
          </div>
        </div>
      </div> */}
      {/* Logout button */}
      <div
        style={{
          paddingLeft: '1rem',
          paddingBottom: '1rem',
          paddingTop: '1rem',
        
        }}
      >
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc là muốn đăng xuất không?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => window.location.href = "/"}
        >
          <Button style={{ background: '#2EA7F5', color: 'white' }}>
            <LogoutOutlined />
            ĐĂNG XUẤT
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default UserDropdown