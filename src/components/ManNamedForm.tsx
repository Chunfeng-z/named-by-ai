import React, { useState } from 'react';
import { Card, Space, Divider, Form, Radio, Input, Select, Button, ConfigProvider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { createStyles } from 'antd-style';
import { genderList, popularList, nameOrigin, meanAndTheme, nicknameList } from '@/assets/nameOrigin';
import styles from './ManNamedForm.module.scss';
import { NameResults } from './NameResults';




const ManNamedForm: React.FC = () => {
    // 重命令避免与css module冲突
    const { styles: gradientStyle } = useStyle();
    const [gender, setGender] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [mean, setMean] = useState<string>('');
    const [popular, setPopular] = useState<string>('');
    const [avoidNames, setAvoidNames] = useState<string>('xxx');
    const [nickname, setNickname] = useState<string>('');
    const [response, setResponse] = useState<string>("x");
    const onGenderChange = (e: RadioChangeEvent) => {
        setGender(e.target.value);
    };
    const onOriginChangeSelect = (value: string) => {
        setOrigin(value);
    };
    const onMeanChangeSelect = (value: string) => {
        setMean(value);
    }
    const onPopularChange = (e: RadioChangeEvent) => {
        setPopular(e.target.value);
    };
    const onNicknameChange = (e: RadioChangeEvent) => {
        setNickname(e.target.value);
    }
    // 下拉框选项
    const nameOriginOptions = getOptions(nameOrigin);
    const meanAndThemeOptions = getOptions(meanAndTheme);
    // form label
    const labelStyle = {
        fontWeight: 650,
        fontSize: '20px'
    }
    return (
        <section className={styles.main} >

            <Card bordered={false} style={{ maxWidth: 650, fontSize: '20px' }} >
                <Form layout='vertical' >
                    <p className={styles['form-introduce']}>
                        Through Named by AI, unveil the ideal name you need. This is a clever name generator that uses artificial intelligence to find unique and meaningful names tailored specifically to your preferences.
                    </p>
                    <div className={styles['form-divider']}>
                        <Divider >Please fill out the form below</Divider>
                    </div>
                    <Form.Item label={<label style={labelStyle}>What is your gender?</label>} name='gender'>
                        <Radio.Group onChange={onGenderChange}>
                            <Space direction="vertical">
                                {genderList.map((item) => {
                                    return <Radio key={item} value={item}>{item}</Radio>
                                })}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>What is your preferred name origin?</label>} name='origin'>
                        <Select
                            showSearch
                            placeholder="No Preference"
                            optionFilterProp="label"
                            onChange={onOriginChangeSelect}
                            options={nameOriginOptions}
                            size="large"
                            variant="filled"
                        />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Would you like the name to have a specific meaning or theme?</label>} name='mean'>
                        <Select
                            showSearch
                            placeholder="No Preference"
                            optionFilterProp="label"
                            onChange={onMeanChangeSelect}
                            options={meanAndThemeOptions}
                            size="large"
                            variant="filled"
                        />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Do you want a popular or unique name?</label>} name='popular'>
                        <Radio.Group onChange={onPopularChange}>
                            <Space direction="vertical">
                                {popularList.map((item) => {
                                    return <Radio key={item} value={item}>{item}</Radio>
                                })}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Are there any names you would like to avoid due to personal reasons or associations?</label>} name='avoid'>
                        <Input size="large" maxLength={80} showCount placeholder="e.g. Tim, Ethan" variant="filled" onChange={(e) => setAvoidNames(e.target.value)} />
                    </Form.Item>
                    <Form.Item label={<label style={labelStyle}>Would you like a name with a nickname or shortened version?</label>} name='nickname'>
                        <Radio.Group onChange={onNicknameChange}>
                            <Space direction="vertical">
                                {nicknameList.map((item, index) => {
                                    return <Radio key={index} value={item}>{item}</Radio>
                                })}
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
                {
                    response && <NameResults name="    <Switch checked={loading} onChange={setLoading} />  <Switch checked={loading} onChange={setLoading} />  <Switch checked={loading} onChange={setLoading} />  <Switch checked={loading} onChange={setLoading} />  <Switch checked={loading} onChange={setLoading} /><Switch checked={loading} onChange={setLoading} />" />
                }
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
