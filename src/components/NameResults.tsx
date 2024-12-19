import React, { useState } from 'react'
import { Typography, Spin, Switch } from 'antd'
import styles from './NameResults.module.scss'
const { Paragraph } = Typography;
type Props = {
    name: string;
};
export const NameResults = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <>
            <Spin spinning={loading} tip='Loading' size='large'>
                <Typography className={styles['name-results']}>
                    <Paragraph>
                        <pre>{props.name}</pre>
                    </Paragraph>
                </Typography>
            </Spin>
            <Switch checked={loading} onChange={setLoading} />
        </>
    );
};