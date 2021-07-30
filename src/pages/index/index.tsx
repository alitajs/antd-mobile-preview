import React, { FC } from 'react';
import { IndexModelState, ConnectProps, connect } from 'alita';
import { Page } from '@alita/react';
import { Card, List, Image } from 'antd-mobile';
import styles from './index.less';
import logo from '@/assets/logo.png';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}
const IndexPage: FC<PageProps> = () => {
  return (
    <div className={styles.center}>
      <div style={{ padding: '0.2rem' }}>
        <Card
          title={
            <List>
              <List.Item
                prefix={<Image src={logo} width={80} />}
                title="这里是标题"
                description="这里是描述信息"
              >
                这里是主信息
              </List.Item>
            </List>
          }
        >
          卡片内容
        </Card>
      </div>
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
