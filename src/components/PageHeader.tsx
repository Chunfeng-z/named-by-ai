import React, { useState } from 'react';
import styles from './PageHeader.module.scss';

const PageHeader: React.FC = () => {
    const [name, setName] = useState<string>('Named By AI✨');
    return (
        <section className={styles.header}> {name}</section >
    );
}

export default PageHeader;