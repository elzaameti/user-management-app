import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Empty, Modal, Form, Input, message, Alert } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import { ArrowLeftOutlined, UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(setUser)
      .catch(err => setError(err.message));
  }, [id]);

  const openEdit = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      street: user.address?.street || "",
      city: user.address?.city || "",
      zipcode: user.address?.zipcode || ""
    });
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    const updatedUser = {
      ...user,
      name: values.name,
      email: values.email,
      phone: values.phone,
      website: values.website,
      address: {
        street: values.street,
        city: values.city,
        zipcode: values.zipcode
      }
    };
    setUser(updatedUser);
    dispatch(updateUser(updatedUser));
    setIsModalVisible(false);
    message.success("User updated successfully!");
  };

  if (error) return (
    <Alert
      message="Error"
      description={error}
      type="error"
      showIcon
      action={<Link to="/"><Button size="small">Back</Button></Link>}
    />
  );

  if (!user) return <Empty description="User not found" />;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Link to="/"><Button icon={<ArrowLeftOutlined />}>Back</Button></Link>
        <Button type="primary" icon={<EditOutlined />} onClick={openEdit}>Edit</Button>
      </div>

      <Card style={{ textAlign: "center", padding: 30 }}>
        <UserOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Website:</strong> {user.website || "N/A"}</p>
        <p><strong>Address:</strong> {user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}` : "N/A"}</p>
      </Card>

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input prefix={<GlobalOutlined />} />
          </Form.Item>
          <Form.Item name="street" label="Street">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item name="zipcode" label="Zipcode">
            <Input prefix={<HomeOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserDetails;
