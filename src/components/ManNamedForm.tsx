import React, { useState } from 'react';
import { Card, Space, Divider, Form, Radio, Input, Select, Button, ConfigProvider, FloatButton } from 'antd';
import { ArrowUpOutlined, MenuFoldOutlined, SyncOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { createStyles } from 'antd-style';
import { nameOrigin, meanAndTheme } from '@/assets/nameOrigin';
import styles from './ManNamedForm.module.scss';



const ManNamedForm: React.FC = () => {
    const [value, setValue] = useState<number>(1);
    // 重命令避免与css module冲突
    const { styles: gradientStyle } = useStyle();
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    const nameOriginOptions = getOptions(nameOrigin);
    const meanAndThemeOptions = getOptions(meanAndTheme);

    const labelStyle = {
        fontWeight: 650,
        fontSize: '20px'
    }
    return (
        <section className={styles.main} >
            <FloatButton.Group
                trigger="click"
                style={{ insetInlineEnd: 24 }}
                icon={<MenuFoldOutlined />}
            >
                <FloatButton icon={<SyncOutlined />} tooltip={<div>Chinese</div>} />
                <FloatButton icon={<ArrowUpOutlined />} tooltip={<div>Up</div>} />
            </FloatButton.Group>
            <Card bordered={false} style={{ maxWidth: 650, fontSize: '20px' }} >
                <Form layout='vertical' >
                    <p className={styles['form-introduce']}>
                        Through Named by AI, unveil the ideal name you need. This is a clever name generator that uses artificial intelligence to find unique and meaningful names tailored specifically to your preferences.
                    </p>
                    <div className={styles['form-divider']}>
                        <Divider >Please fill out the form below</Divider>
                    </div>
                    <Form.Item label={<label style={labelStyle}>What is your gender?</label>} name='gender'>
                        <Radio.Group onChange={onChange}>
                            <Space direction="vertical">
                                <Radio value={1}>Boy</Radio>
                                <Radio value={2}>Girl</Radio>
                                <Radio value={3}>Unknown</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>What is your preferred name origin?</label>} name='country'>
                        <Select
                            showSearch
                            placeholder="No Preference"
                            optionFilterProp="label"
                            onChange={onChangeSelect}
                            onSearch={onSearch}
                            options={nameOriginOptions}
                            size="large"
                            variant="filled"
                        />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Would you like the name to have a specific meaning or theme?</label>} name='preference'>
                        <Select
                            showSearch
                            placeholder="No Preference"
                            optionFilterProp="label"
                            onChange={onChangeSelect}
                            onSearch={onSearch}
                            options={meanAndThemeOptions}
                            size="large"
                            variant="filled"
                        />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Do you want a popular or unique name?</label>} name='popular'>
                        <Radio.Group onChange={onChange}>

                            <Space direction="vertical">
                                <Radio value={1}>Popular</Radio>
                                <Radio value={2}>Unique</Radio>
                                <Radio value={3}>No Preference</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Are there any names you would like to avoid due to personal reasons or associations?</label>} name='popular'>
                        <Input size="large" maxLength={80} showCount placeholder="e.g. Tim, Ethan" variant="filled" />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Would you like a name with a nickname or shortened version?</label>} name='popular'>
                        <Radio.Group onChange={onChange}>

                            <Space direction="vertical">
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>
                                <Radio value={3}>No preference</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <ConfigProvider
                            button={{
                                className: gradientStyle.linearGradientButton
                            }}
                        >
                            <Button type="primary" size="large" shape="round">Generate Names</Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Card>
        </section >
    );
}


const getOptions = (nameOrigin: string[]) => {
    return nameOrigin.map((item) => {
        return { value: item, label: item }
    })
}

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
}));

export default ManNamedForm;
