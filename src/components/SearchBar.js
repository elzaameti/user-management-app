import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchBar({ value, onChange }) {
  return (
    <Input
      size="large"
      placeholder="Search by name or email..."
      prefix={<SearchOutlined />}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ 
        marginBottom: 20,
        borderRadius: '8px'
      }}
    />
  );
}

export default SearchBar;