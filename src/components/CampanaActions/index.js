import React from "react";

import { Button } from "antd";

import { ExportOutlined } from "@ant-design/icons";

const CampanaActions = () => {
  return (
    <>
      <Button type="primary">Nuevo</Button>
      <Button type="link">
        <ExportOutlined style={{ fontSize: "20px" }} />
      </Button>
    </>
  );
};

export default CampanaActions;
