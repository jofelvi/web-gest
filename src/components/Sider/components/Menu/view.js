import React from 'react';

import { Menu as AntdMenu, Icon } from 'antd';

import { SideLink } from './styles';

const { Item, SubMenu } = AntdMenu;

const Menu = () => (
  <AntdMenu
    mode="inline"
    defaultSelectedKeys={['1']}
    style={{ height: '100%', borderRight: 0 }}
  >
    <Item key="1">
      <Icon type="desktop" />
      <span>
        <SideLink to="/">Inicio</SideLink>
      </span>
    </Item>
    <Item key="2">
      <Icon type="user" />
      <span>
        <SideLink to="/users">Usuarios Farmacia</SideLink>
      </span>
    </Item>
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="setting" />
          <span>Gestión</span>
        </span>
      }
    >
      <Item key="3">
        <span>
          <Icon type="user" />
          <SideLink to="/management/group">Grupo</SideLink>
        </span>
      </Item>
      <Item key="4">
        <span>
          <Icon type="user" />
          <SideLink to="/management/enterprise-group">
            Grupo Empresarial
          </SideLink>
        </span>
      </Item>
      <Item key="5">
        <span>
          <Icon type="user" />
          <SideLink to="/management/delegate">Delegado</SideLink>
        </span>
      </Item>
      <Item key="6">
        <span>
          <Icon type="user" />
          <SideLink to="/management/area-managers">Jefes de zona</SideLink>
        </span>
      </Item>
      <Item key="7">
        <span>
          <Icon type="user" />
          <SideLink to="/management/products">Producto</SideLink>
        </span>
      </Item>
      <Item key="8">
        <span>
          <Icon type="user" />
          <SideLink to="/management/subgroup">Subgrupo</SideLink>
        </span>
      </Item>
      <Item key="9">
        <span>
          <Icon type="user" />
          <SideLink to="/management/foreclosed-orders">
            Pedidos embargados
          </SideLink>
        </span>
      </Item>
      <Item key="10">
        <span>
          <Icon type="user" />
          <SideLink to="/management/commercial-deals">
            Acuerdos comerciales
          </SideLink>
        </span>
      </Item>
    </SubMenu>
    <Item key="11">
      <span>
        <Icon type="user" />
        <SideLink to="/wholesaler-pharmacy">Mayorista-Farmacia</SideLink>
      </span>
    </Item>
    <Item key="12">
      <span>
        <Icon type="user" />
        <SideLink to="/deals">Ofertas</SideLink>
      </span>
    </Item>
    <SubMenu
      key="sub2"
      title={
        <span>
          <Icon type="setting" />
          <span>Gestión masiva</span>
        </span>
      }
    >
      <Item key="13">
        <span>
          <Icon type="user" />
          <SideLink to="/massive-management/delegates-pharmacy">
            Delegados y Farmacias
          </SideLink>
        </span>
      </Item>
      <Item key="14">
        <span>
          <Icon type="user" />
          <SideLink to="/massive-management/relationships">Relaciones</SideLink>
        </span>
      </Item>
      <Item key="15">
        <span>
          <Icon type="user" />
          <SideLink to="/massive-management/purchase-limit">
            Limitación de compras
          </SideLink>
        </span>
      </Item>
    </SubMenu>
    <Item key="16">
      <span>
        <Icon type="user" />
        <SideLink to="/cmi">CMI</SideLink>
      </span>
    </Item>
    <Item key="17">
      <span>
        <Icon type="user" />
        <SideLink to="/reports">Informes</SideLink>
      </span>
    </Item>
    <Item key="18">
      <span>
        <Icon type="user" />
        <SideLink to="/online-help">Ayuda Online</SideLink>
      </span>
    </Item>
  </AntdMenu>
);

export default Menu;
