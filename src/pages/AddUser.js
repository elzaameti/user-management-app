import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, MailOutlined, ShopOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function AddUser({ onAdd }) {
  const [form] = Form.useForm();
  const users = useSelector(state => state.users.list);

  const handleSubmit = (values) => {
    const emailExists = users.some(
      user => user.email.toLowerCase() === values.email.toLowerCase()
    );

    if (emailExists) {
      form.setFields([
        {
          name: "email",
          errors: ["This email already exists!"],
        },
      ]);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      company: values.company || "Not specified",
      username: values.username || `user_${Date.now()}`,
      website: values.website || "Not specified",
    };

    onAdd(newUser);
    form.resetFields();
    message.success("User added successfully!");
  };

  return (
    <Card title="➕ Add New User" style={{ marginBottom: 20 }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="john@example.com" />
        </Form.Item>

        <Form.Item name="company" label="Company (optional)">
          <Input prefix={<ShopOutlined />} placeholder="Company Name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddUser;
