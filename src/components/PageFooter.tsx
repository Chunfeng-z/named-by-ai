
import React from 'react';
import styles from './PageFooter.module.scss';
import { useTranslation } from 'react-i18next';

const PageFooter: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.footer} >
            🐶<a className={styles['footer-link']}>{t('components.PageFooter.083208-0')}</a>✨
        </section >
    );
}

export default PageFooter;
