import React, { FC, useState, useRef } from 'react';
import { Page, Content, Footer } from '@alita/react';
import { Button, List, InfiniteScroll, PullToRefresh } from 'antd-mobile';
import { query } from './service';

interface ListrefreshPageProps {}

interface ListItemProps {
  random: string;
  time: string;
  id: string;
  title: string;
}
const ListrefreshPage: FC<ListrefreshPageProps> = () => {
  const [data, setData] = useState<ListItemProps[]>([]);
  const ele = useRef<any>();
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const append = await query(20);
    setData((val) => [...val, ...append]);
    setHasMore(append.length > 0);
  }
  async function refresh() {
    const append = await query(20);
    setData(append);
    setHasMore(append.length > 0);
  }
  return (
    <Page>
      <Content ref={ele}>
        <PullToRefresh onRefresh={refresh}>
          <List>
            {data.map((item) => (
              <List.Item key={item.id} description={`数据生成时间：${item.time}`}>
                {`随机KEY：${item.random}`}
              </List.Item>
            ))}
          </List>
          <InfiniteScroll threshold={250} loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </Content>
      <Footer>
        <Button
          block
          size="large"
          color="primary"
          onClick={() => {
            ele.current?.scrollTo({
              top: 0,
            });
          }}
        >
          回到顶部
        </Button>
      </Footer>
    </Page>
  );
};

export default ListrefreshPage;
