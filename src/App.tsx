import React, { useState, Suspense } from 'react'
import { FloatButton, message, Spin } from 'antd'
import { useTranslation, Trans } from 'react-i18next';
import { MenuFoldOutlined, SyncOutlined, RobotOutlined } from '@ant-design/icons'
import { modalOptions, ModalItem } from './assets/modalOptions'
import i18n from './i18n/i18n'
import langs from './i18n/langs';
import './App.scss'

// 动态加载组件
const PageHeader = React.lazy(() => import('@/components/PageHeader'));
const ManNamedForm = React.lazy(() => import('@/components/ManNamedForm'));
const PageFooter = React.lazy(() => import('@/components/PageFooter'));


const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>(langs[i18n.language === 'zh_CN' ? 'zh' : 'en'].nativeName);
  const [currentModal, setCurrentModal] = useState<ModalItem>(modalOptions[0]);
  // 点击切换模型，并给出提示
  const handleModalClick = () => {
    const modalId = (currentModal.id + 1) % modalOptions.length;
    const nextModal = modalOptions[modalId];
    setCurrentModal(modalOptions[modalId]);
    messageApi.open({
      type: 'info',
      content: `Current Modal: ${nextModal.name} , Index: ${nextModal.id + 1}`,
    });
  }
  // 语言切换功能
  const changeLanguage = () => {
    const currentLang = i18n.language === 'zh_CN' ? 'zh' : 'en';
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    setCurrentLang(langs[newLang].nativeName);
  }


  return (
    <>
      {contextHolder}
      <Suspense fallback={<Loading />}>
        <FloatButton.Group
          trigger="click"
          style={{ insetInlineEnd: 24 }}
          icon={<MenuFoldOutlined />}
        >
          <FloatButton onClick={handleModalClick} icon={<RobotOutlined />} tooltip={<div>Modal</div>} />
          <FloatButton onClick={() => { changeLanguage() }} icon={<SyncOutlined />} tooltip={<div>{currentLang}</div>} />
          <FloatButton.BackTop visibilityHeight={0} tooltip={<div>Up</div>} />
        </FloatButton.Group>
        <PageHeader />
        <ManNamedForm />
        <PageFooter />
      </Suspense>
    </>
  )
}

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
}

export default App
