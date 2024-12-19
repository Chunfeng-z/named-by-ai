import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import ManNamedForm from '@/components/ManNamedForm'
import { FloatButton } from 'antd'
import { MenuFoldOutlined, SyncOutlined } from '@ant-design/icons'
import './App.scss'


function App() {
  return (
    <>
      <FloatButton.Group
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        icon={<MenuFoldOutlined />}
      >
        <FloatButton icon={<SyncOutlined />} tooltip={<div>Chinese</div>} />
        <FloatButton.BackTop visibilityHeight={0} tooltip={<div>Up</div>} />
      </FloatButton.Group>
      <PageHeader />
      <ManNamedForm />
      <PageFooter />
    </>
  )
}

export default App
