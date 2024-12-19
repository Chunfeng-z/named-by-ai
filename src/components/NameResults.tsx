import { Typography, Spin } from 'antd'
import styles from './NameResults.module.scss'
const { Paragraph } = Typography;
type Props = {
    name: string;
    loading: boolean;
};
export const NameResults = (props: Props) => {
    return (
        <>
            <Spin spinning={props.loading && !props.name} tip='Loading' size='large'>
                <Typography className={styles['name-results']}>
                    <Paragraph>
                        <pre>{props.name}</pre>
                    </Paragraph>
                </Typography>
            </Spin>
        </>
    );
};