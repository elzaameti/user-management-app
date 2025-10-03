import { List, Card, Tag, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { 
  UserOutlined, 
  MailOutlined, 
  ShopOutlined, 
  DeleteOutlined
} from "@ant-design/icons";

function UserList({ users, onDelete }) {
  const handleDelete = (userId, userName) => {
    onDelete(userId);
    message.success(`User ${userName} deleted successfully!`);
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <Card
            hoverable
            style={{ borderRadius: '12px', height: '100%' }}
            actions={[
              <Link to={`/user/${user.id}`}>
                <Button type="primary" icon={<UserOutlined />}>
                  View
                </Button>
              </Link>,
              <Popconfirm
                title="Delete User"
                description={`Are you sure to delete ${user.name}?`}
                onConfirm={() => handleDelete(user.id, user.name)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            ]}
          >
            <Card.Meta
              avatar={<UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
              title={user.name}
              description={
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <MailOutlined /> {user.email}
                  </div>
                  <div>
                    <ShopOutlined /> 
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {user.company?.name}
                    </Tag>
                  </div>
                  {user.username && (
                    <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                      @{user.username}
                    </div>
                  )}
                </div>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default UserList;