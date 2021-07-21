import React, { FC } from 'react';
import { IndexModelState, ConnectProps, connect } from 'alita';
import { Button } from 'antd-mobile';
import styles from './index.less';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}
const IndexPage: FC<PageProps> = () => {
  return (
    <div className={styles.center}>
      <Button size="large" color="primary" type="reset">
        按钮
      </Button>
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
