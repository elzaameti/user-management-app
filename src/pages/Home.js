import { useEffect, useState } from "react";
import { Row, Col, Alert, Empty, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, setError, addUser, deleteUser } from "../store/userSlice";

import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import AddUser from "./AddUser";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);
  const error = useSelector(state => state.users.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then(data => dispatch(setUsers(data)))
      .catch(err => dispatch(setError(err.message)));
  }, [dispatch]);

  const handleAddUser = (newUser) => {
    const emailExists = users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (emailExists) {
      message.error("This email already exists!");
      return;
    }

    newUser.isLocal = true;
    dispatch(addUser(newUser));
    message.success("User added successfully!");
  };

  
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    message.success("User deleted successfully!");
  };

  
  const handleSort = () => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: 'name', direction });
  };

  
  const displayedUsers = (() => {
    
    const localUsers = users.filter(u => u.isLocal)
      .filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const apiUsers = users.filter(u => !u.isLocal)
      .filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

    
    return [...localUsers, ...apiUsers];
  })();

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <AddUser onAdd={handleAddUser} />
        </Col>

        <Col xs={24} lg={16}>
          <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <SortControls onSort={handleSort} sortConfig={sortConfig} />
          </div>

          {displayedUsers.length === 0 ? (
            <Empty description="No users found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <UserList users={displayedUsers} onDelete={handleDeleteUser} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Home;
