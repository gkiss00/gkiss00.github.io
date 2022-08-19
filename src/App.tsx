import React from 'react'
import './App.scss'
import Cube from './components/cube/Cube'
import GlowingCube from './components/glowingCube/GlowingCube'
import MainPage from './components/MainPage'
import AboutMePage from './components/pages/aboutMePage/AboutMePage'
import ProjectPage from './components/pages/projectPage/ProjectPage'

const App: React.FC<any> = () => {
  return (
   <>
   <AboutMePage></AboutMePage>
    <ProjectPage></ProjectPage>
    <ProjectPage></ProjectPage>
   </>
  )
}

export default App
