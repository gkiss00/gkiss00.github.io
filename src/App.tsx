import React from 'react'
import './App.scss'
import Cube from './components/cube/Cube'
import GlowingCube from './components/glowingCube/GlowingCube'
import MainPage from './components/MainPage'
import AboutMePage from './components/pages/aboutMePage/AboutMePage'
import PathFindingPage from './components/pages/pathFinding/PathFindingPage'
import ProjectPage from './components/pages/projectPage/ProjectPage'
import TestPage from './components/pages/testPage/TestPage'

const App: React.FC<any> = () => {
  return (
   <>
   <AboutMePage></AboutMePage>
    <ProjectPage></ProjectPage>
    <ProjectPage></ProjectPage>
    <PathFindingPage></PathFindingPage>
   </>
  )
}

export default App
