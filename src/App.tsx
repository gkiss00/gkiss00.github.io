import React from 'react'
import './App.scss'
import AboutMePage from './components/pages/aboutMePage/AboutMePage'
import ProjectPage from './components/pages/projectPage/ProjectPage'

const App: React.FC<any> = () => {
  return (
   <>
   <AboutMePage></AboutMePage>
    <ProjectPage></ProjectPage>
   </>
  )
}

export default App
