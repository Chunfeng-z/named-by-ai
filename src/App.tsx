import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import ManNamedForm from '@/components/manNamedForm'
import './App.scss'


function App() {

  return (
    <>
      <PageHeader />
      <ManNamedForm />
      <PageFooter />
    </>
  )
}

export default App
