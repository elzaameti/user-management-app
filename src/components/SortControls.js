import { Button } from "antd";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

function SortControls({ onSort, sortConfig }) {
  return (
    <Button
      type="primary"
      icon={sortConfig.direction === "asc" ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
      onClick={() => onSort("name")}
    >
      Name
    </Button>
  );
}

export default SortControls;
