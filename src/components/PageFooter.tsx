
import React, { useState } from 'react';
import styles from './PageFooter.module.scss';

const PageFooter: React.FC = () => {
    const [name, setName] = useState<string>('AI Named My Pet');
    return (
        <section className={styles.footer} >
            🐶<a className={styles['footer-link']}>{name}</a>✨
        </section >
    );
}

export default PageFooter;
