import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import ManNamedForm from '@/components/ManNamedForm'
import { FloatButton, message } from 'antd'
import { useTranslation, Trans } from 'react-i18next';
import { MenuFoldOutlined, SyncOutlined, RobotOutlined } from '@ant-design/icons'
import { modalOptions, ModalItem } from './assets/modalOptions'
import './App.scss'
import React, { useState } from 'react'


const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [currentModal, setCurrentModal] = useState<ModalItem>(modalOptions[0]);
  // 点击切换模型，并给出提示
  const handleModalClick = () => {
    const modalId = (currentModal.id + 1) % modalOptions.length;
    const nextModal = modalOptions[modalId];
    setCurrentModal(modalOptions[modalId]);
    messageApi.open({
      type: 'info',
      content: `Current modal: ${nextModal.name} , 序号: ${nextModal.id + 1}`,
    });
  }

  return (
    <>
      {contextHolder}
      <FloatButton.Group
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        icon={<MenuFoldOutlined />}
      >
        <FloatButton onClick={handleModalClick} icon={<RobotOutlined />} tooltip={<div>Modal</div>} />
        <FloatButton icon={<SyncOutlined />} tooltip={<div>{t('Chinese')}</div>} />
        <FloatButton.BackTop visibilityHeight={0} tooltip={<div>Up</div>} />
      </FloatButton.Group>
      <PageHeader />
      <ManNamedForm />
      <PageFooter />
    </>
  )
}

export default App
