import React from 'react';
import styles from './PageHeader.module.scss';
import { useTranslation } from 'react-i18next';

const PageHeader: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.header}> {t('components.PageHeader.592797-0')}✨</section >
    );
}

export default PageHeader;