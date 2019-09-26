import React from 'react';
import { withRouter } from 'react-router-dom';

import { Menu as AntdMenu } from 'antd';

import MenuItemContent from './components/MenuItemContent';
import SubMenuItemContent from './components/SubMenuItemContent';

const { Item, SubMenu } = AntdMenu;

const setSideItems = ({ pathname, selectedKeys, openKeys }) => {
  if (pathname === '/tasks/user') {
    selectedKeys = ['sub-tasks', 'task-list-1'];
    openKeys = ['sub-tasks'];
  }

  if (pathname === '/tasks/group') {
    selectedKeys = ['sub-tasks', 'task-list-2'];
    openKeys = ['sub-tasks'];
  }

  if (pathname === '/tasks') {
    selectedKeys = ['sub-tasks', 'task-list-3'];
    openKeys = ['sub-tasks'];
  }

  return { setSelectedKeys: selectedKeys, setOpenKeys: openKeys };
};

const Menu = ({ location: { pathname } }) => {
  let selectedKeys = ['1'];
  let openKeys = [];

  const { setSelectedKeys, setOpenKeys } = setSideItems({
    pathname,
    selectedKeys,
    openKeys,
  });

  selectedKeys = setSelectedKeys;
  openKeys = setOpenKeys;

  return (
    <AntdMenu
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Item key="1">
        <MenuItemContent icon="desktop" link="/" name="Inicio" />
      </Item>
      <SubMenu
        key="sub-tasks"
        title={
          <SubMenuItemContent
            icon="profile"
            isLink={false}
            name="Gestión de tareas"
          />
        }
      >
        <Item key="task-list-1">
          <SubMenuItemContent
            icon="user"
            link="/tasks/user"
            name="Mis tareas"
          />
        </Item>
        <Item key="task-list-2">
          <SubMenuItemContent
            icon="team"
            link="/tasks/group"
            name="Tareas de mi grupo"
          />
        </Item>
        <Item key="task-list-3">
          <SubMenuItemContent
            icon="team"
            link="/tasks"
            name="Todas las tareas"
          />
        </Item>
      </SubMenu>
      <Item key="2">
        <MenuItemContent
          icon="user"
          link="/process/signup"
          name="Usuarios Farmacia"
        />
      </Item>
      <SubMenu
        key="sub1"
        title={
          <SubMenuItemContent icon="setting" isLink={false} name="Gestión" />
        }
      >
        <Item key="3">
          <SubMenuItemContent
            icon="user"
            link="/management/group"
            name="Gestión"
          />
        </Item>
        <Item key="4">
          <SubMenuItemContent
            icon="user"
            link="/management/enterprise-group"
            name="Grupo Empresarial"
          />
        </Item>
        <Item key="5">
          <SubMenuItemContent
            icon="user"
            link="/management/delegate"
            name="Delegado"
          />
        </Item>
        <Item key="6">
          <SubMenuItemContent
            icon="user"
            link="/management/area-managers"
            name="Jefes de zona"
          />
        </Item>
        <Item key="7">
          <SubMenuItemContent
            icon="user"
            link="/management/products"
            name="Producto"
          />
        </Item>
        <Item key="8">
          <SubMenuItemContent
            icon="user"
            link="/management/subgroup"
            name="Subgrupo"
          />
        </Item>
        <Item key="9">
          <SubMenuItemContent
            icon="user"
            link="/management/foreclosed-orders"
            name="Pedidos Embargados"
          />
        </Item>
        <Item key="10">
          <SubMenuItemContent
            icon="user"
            link="/management/commercial-deals"
            name="Acuerdos comerciales"
          />
        </Item>
      </SubMenu>
      <Item key="11">
        <SubMenuItemContent
          icon="user"
          link="/management/wholesaler-pharmacy"
          name="Mayorista-Farmacia"
        />
      </Item>
      <Item key="12">
        <SubMenuItemContent icon="user" link="/deals" name="Ofertas" />
      </Item>
      <SubMenu
        key="sub2"
        title={
          <SubMenuItemContent
            icon="setting"
            isLink={false}
            name="Gestión masiva"
          />
        }
      >
        <Item key="13">
          <SubMenuItemContent
            icon="user"
            link="/massive-management/delegates-pharmacy"
            name="Delegados y Farmacias"
          />
        </Item>
        <Item key="14">
          <SubMenuItemContent
            icon="user"
            link="/massive-management/relationships"
            name="Relaciones"
          />
        </Item>
        <Item key="15">
          <SubMenuItemContent
            icon="user"
            link="/massive-management/purchase-limit"
            name="Limitación de compras"
          />
        </Item>
      </SubMenu>
      <Item key="16">
        <SubMenuItemContent icon="user" link="/cmi" name="CMI" />
      </Item>
      <Item key="17">
        <SubMenuItemContent icon="user" link="/reports" name="Informes" />
      </Item>
      <Item key="18">
        <SubMenuItemContent
          icon="user"
          link="/online-help"
          name="Ayuda Online"
        />
      </Item>
    </AntdMenu>
  );
};

export default withRouter(Menu);
