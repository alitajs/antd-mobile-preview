import React, { FC } from 'react';
import { Page, Content, Footer } from '@alita/react';
import {
  Button,
  Space,
  Form,
  Dialog,
  Input,
  Checkbox,
  TextArea,
  Radio,
  Selector,
  Switch,
  Slider,
  Cascader,
  Search,
  Rate,
} from 'antd-mobile';

interface FormPageProps {}

const ItemList = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
];

const options = [
  {
    label: '分类A很长很长很长很长的标题',
    value: 'A',
    children: [
      {
        label: '分类A-1',
        value: 'A1',
      },
      {
        label: '分类A-2',
        value: 'A2',
      },
    ],
  },
  {
    label: '分类B',
    value: 'B',
    children: [
      {
        label: '分类B-1',
        value: 'B1',
      },
      {
        label: '分类B-2',
        value: 'B2',
      },
    ],
  },
];

const marks = {
  0: 0,
  20: 20,
  40: 40,
  60: 60,
  80: 80,
  100: 100,
};

const FormPage: FC<FormPageProps> = () => {
  const [form] = Form.useForm();
  const onSubmit = () => {
    const values = form.getFieldsValue();
    Dialog.show({
      content: JSON.stringify(values),
    });
  };
  return (
    <Page>
      <Content>
        <Form
          form={form}
          hasFeedback
          initialValues={{
            input: 'alita',
            checkbox: [],
            cascader: ['A', 'A1'],
          }}
        >
          <Form.Item name="input" label="输入框">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="checkbox" label="勾选框" required>
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="1">选项1</Checkbox>
                <Checkbox value="2">选项2</Checkbox>
                <Checkbox value="3" disabled>
                  选项3
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="表单联动-勾选框"
            shouldUpdate={(prevValues, curValues) => {
              return prevValues.checkbox !== curValues.checkbox;
            }}
          >
            {({ getFieldValue }) => {
              return JSON.stringify(getFieldValue('checkbox'));
            }}
          </Form.Item>
          <Form.Item name="textArea" label="文本框">
            <TextArea placeholder="请输入内容" />
          </Form.Item>
          <Form.Item name="radio" label="单选框">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="apple">苹果</Radio>
                <Radio value="orange">橘子</Radio>
                <Radio value="banana">香蕉</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="selector" label="选择组">
            <Selector options={ItemList} />
          </Form.Item>
          <Form.Item name="selectorMultiple" label="选择组（multiple）">
            <Selector options={ItemList} multiple />
          </Form.Item>
          <Form.Item name="switch" label="开关">
            <Switch />
          </Form.Item>
          <Form.Item name="sliderTicks" label="滑动输入条（ticks）">
            <Slider marks={marks} ticks />
          </Form.Item>
          <Form.Item name="slider" label="滑动输入条">
            <Slider step={20} defaultValue={40} />
          </Form.Item>
          <Form.Item name="cascader" label="级联选择器">
            <Cascader options={options} />
          </Form.Item>
          <Form.Item name="search" label="搜索">
            <Search placeholder="请输入内容" showCancelButton />
          </Form.Item>
          <Form.Item name="rate" label="评分">
            <Rate />
          </Form.Item>
        </Form>
      </Content>
      <Footer>
        <Button block size="large" color="primary" onClick={onSubmit}>
          提交
        </Button>
      </Footer>
    </Page>
  );
};

export default FormPage;
