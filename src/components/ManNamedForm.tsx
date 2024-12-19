import React, { useState } from 'react';
import { Card, Space, Divider, Form, Radio, Input, Select, Button, ConfigProvider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { createStyles } from 'antd-style';
import { genderList, popularList, nameOrigin, meanAndTheme, nicknameList } from '@/assets/nameOrigin';
import styles from './ManNamedForm.module.scss';
import { NameResults } from './NameResults';
import { modalPresetPrompts } from '@/assets/modalOptions';

const ManNamedForm: React.FC = () => {
    // 重命令避免与css module冲突
    const { styles: gradientStyle } = useStyle();
    const [gender, setGender] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [mean, setMean] = useState<string>('');
    const [popular, setPopular] = useState<string>('');
    const [avoidNames, setAvoidNames] = useState<string>('xxx');
    const [nickname, setNickname] = useState<string>('');
    const [resShow, setResShow] = useState<boolean>(false);
    const [nameRes, setNameRes] = useState<string>('');
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
    // 渲染获取的数据
    const renderResults = () => {
        // !TODO: 在这里还需要拼接用户输入的信息
        getResults(modalPresetPrompts['Chinese'], setNameRes);
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
                            <Button type="primary" size="large" shape="round" onClick={() => { renderResults(); setResShow(true) }}>Generate Names</Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
                {
                    resShow && <NameResults name={nameRes} loading={resShow} />
                }
            </Card>

        </section >
    );
}

// 请求AI接口获取结果
const getResults = (text: string, setNameRes: React.Dispatch<React.SetStateAction<string>>) => {
    const apiKey = '48VAbMd6l781MvQH98H4:1cf66b80f6424e29a8bfc19924bdfe1d40fa4179ebf60a67ebc4af6b8b08a27a';
    const data = {
        messages: [
            {
                role: 'user',
                content: text
            }
        ],
        stream: true
    };
    console.log('input text', text);
    (async () => {
        const res = await fetch('https://api.chat.jina.ai/v1/chat/completions', {
            headers: {
                authorization: `Bearer ${apiKey}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
            method: 'POST',
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            // 数据解析
            const str = dataPreprocess(decoder.decode(value));
            result += str;
            setNameRes(result);
        }
    })();
}

interface chunkItem {
    choices:
    {
        delta: {
            content?: string;
        }
    }[]
}

const dataPreprocess = (data: string): string => {
    const chunks = data.split('\n\n').slice(0, -1);
    const results = chunks.map((chunk) => {
        try {
            const newChunk = chunk.slice(6);
            return newChunk != '[DONE]' ? JSON.parse(newChunk) : '';
        } catch (e) {
            console.log("Error parsing JSON data", e);
        }
    });
    let str = '';
    results.forEach((item: chunkItem) => {
        if (item && item.choices[0].delta?.content) {
            str += item.choices[0].delta?.content;
        }
    })
    return str;
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
