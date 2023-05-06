import React from 'react'
import './App.scss'
import Cube from './components/cube/Cube'
import GlowingCube from './components/glowingCube/GlowingCube'
import MainPage from './components/MainPage'
import AboutMePage from './components/pages/aboutMePage/AboutMePage'
import PathFindingPage from './components/pages/pathFinding/PathFindingPage'
import ProjectPage from './components/pages/projectPage/ProjectPage'
import TestPage from './components/pages/testPage/TestPage'
import SortingPage from './components/pages/sortingPage/SortingPage'

const App: React.FC<any> = () => {
  return (
   <>
   <AboutMePage></AboutMePage>
    <ProjectPage></ProjectPage>
    <PathFindingPage></PathFindingPage>
    <SortingPage></SortingPage>
   </>
  )
}

export default App
