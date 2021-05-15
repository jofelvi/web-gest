import styled from "styled-components";

import { Avatar, Col, Button } from "antd";

export const LogoContainer = styled.div`
  width: 110px;
  margin-right: 10px;
  float: left;
`;

export const Logo = styled(Avatar)`
  width: 100px;
  height: 45px;
`;

export const RightSectionContainer = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

export const SignupButton = styled(Button)`
  margin-left: 10px;
`;
