import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}>
            👥 User Management System
          </Header>

          <Content style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            React Internship Challenge ©2025
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
