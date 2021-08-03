import React, { FC, useState } from 'react';
import { history } from 'alita';
import { Page, Header, Content } from '@alita/react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './index.less';

interface MenuItem {
  path: string;
  title: string;
}
const menuData: MenuItem[] = [
  {
    path: '/',
    title: '二维码地址',
  },
  {
    path: '/authtest',
    title: '登录',
  },
  {
    path: '/form',
    title: '表单元素',
  },
  {
    path: '/listrefresh',
    title: '无限滚动和下拉刷新',
  },
];
const SideMenu: FC<{ location: any; setOpen: (open: boolean) => void }> = (props) => {
  return (
    <Page className={styles.sideMenu}>
      <Header className={styles.yhHeader}>
        <h1 className={styles.title}>菜单栏</h1>
      </Header>
      <Content>
        {menuData.map((menu) => (
          <div className={styles.item} key={menu.path}>
            <a
              className={styles.content}
              onClick={() => {
                if (props?.location?.pathname !== menu.path) {
                  history.push(menu.path);
                }
                props.setOpen && props.setOpen(false);
              }}
              style={{ fontWeight: props?.location?.pathname === menu.path ? 500 : 300 }}
            >
              {menu.title}
            </a>
          </div>
        ))}
      </Content>
    </Page>
  );
};
const getTitle = (pathname: string) => {
  const arr2 = menuData.filter((item) => item.path === pathname);
  return arr2[0]?.title || '';
};
const SideMenuContent: FC<{ open: boolean; setOpen: (open: boolean) => void; location: any }> = (
  props,
) => {
  return (
    <Page
      className={styles.sideMenuContent}
      style={{
        zIndex: 1,
        transform: `translate3d(${props.open ? '5.4rem' : '0'}, 0px, 0px)`,
      }}
    >
      <Header className={styles.yhHeader}>
        <h1 className={styles.title}>{getTitle(props?.location?.pathname)}</h1>
        <div
          className={styles.headerBtn}
          onClick={() => {
            props.setOpen && props.setOpen(!props.open);
          }}
        >
          {props.open ? (
            <MenuFoldOutlined style={{ fontSize: '0.44rem' }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: '0.44rem' }} />
          )}
        </div>
      </Header>
      <Content>{props.children}</Content>
    </Page>
  );
};
const Layout: FC<{ location: any }> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.content}>
      <Page>
        <SideMenuContent {...props} open={open} setOpen={setOpen} />
        <SideMenu setOpen={setOpen} {...props} />
      </Page>
    </div>
  );
};

export default Layout;
