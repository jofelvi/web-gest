import styled from "styled-components";
import { Layout,Col } from 'antd';
const { Content, Header, Sider } = Layout;

export const ContentContainer = styled(Content)`
${props => props.pathnameTask ?
    `
  overflow: hidden;
    `
   : ''};
`;
