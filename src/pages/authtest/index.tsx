import React, { FC, useState, useEffect } from 'react';
import { useRequest, AuthModelState, ConnectProps, connect } from 'alita';
import { Page, Footer, Content } from '@alita/react';
import { Button, Space, Mask, Form, Input, Dialog } from 'antd-mobile';
import { mockQuery } from './service';
import styles from './index.less';

interface AuthtestPageProps extends ConnectProps {
  auth: AuthModelState;
}

const AuthtestPage: FC<AuthtestPageProps> = ({ auth, dispatch }) => {
  const { authToken, username } = auth;
  const [state, setState] = useState('');
  const { loading, run } = useRequest(mockQuery, {
    manual: true,
    onSuccess: (result) => {
      setState(result);
      // TODO: 真实的拦截应该写在 src/app 中的 middlewares
      if (result.status === 401) {
        Dialog.show({
          // cancelText: '取消',
          okText: '确定',
          title: '这是验证未通过时间的统一拦截处理',
          content: '跳转到重新登录',
          onOk: () => {
            setState('');
            dispatch?.({
              type: 'auth/logout',
              payload: {},
            });
          },
        });
      } else if (result.status === 403) {
        Dialog.show({
          okText: '确定',
          title: '这是未登录时间的统一拦截处理',
          content: '匿名禁止访问',
        });
      }
    },
  });
  useEffect(() => {
    dispatch?.({
      type: 'auth/queryToken',
      payload: {},
    });
  }, []);
  const onFinish = (values: any) => {
    dispatch?.({
      type: 'auth/login',
      payload: values,
    });
  };
  return (
    <Page className={styles.page}>
      <Mask visible={!authToken}>
        <Page>
          <Content>
            <Form hasFeedback onFinish={onFinish}>
              <Form.Item
                name="name"
                label="用户名"
                rules={[{ required: true, message: '用户名不能为空，试试 admin 或者 user' }]}
              >
                <Input onChange={console.log} placeholder="试试 admin 或者 user" />
              </Form.Item>
              <Form.Item
                name="pw"
                label="密码"
                rules={[{ required: true, message: '密码不能为空，密码：1' }]}
              >
                <Input type="password" onChange={console.log} placeholder="请输入密码" />
              </Form.Item>
              <Space />
              <Button block size="large" type="submit" color="primary">
                登录
              </Button>
            </Form>
          </Content>
        </Page>
      </Mask>
      <Content className={styles.content}>
        <h1>当前用户:{username}</h1>
        登录通过后，在本地保存服务端给的凭据，并且，与服务端的每次交互都需要在头中传递凭据（除了无需认证的资源）
        <br />
        <br />
        <br />
        <Button block color="primary" size="large" onClick={() => run(200)} loading={loading}>
          创建请求，模拟服务端有效响应200
        </Button>
        <Space />
        <Button block color="warning" size="large" onClick={() => run(403)} loading={loading}>
          创建请求，模拟服务端未认证响应403
        </Button>
        <Space />
        <Button block color="danger" size="large" onClick={() => run(401)} loading={loading}>
          创建请求，模拟服务端无效凭据401
        </Button>
        <div className={styles.data}>{JSON.stringify(state)}</div>
      </Content>
      <Footer>
        <Button
          block
          color="danger"
          onClick={() => {
            dispatch?.({
              type: 'auth/logout',
              payload: {},
            });
          }}
        >
          登出
        </Button>
      </Footer>
    </Page>
  );
};

export default connect(({ auth }: { auth: AuthModelState }) => ({ auth }))(AuthtestPage);
