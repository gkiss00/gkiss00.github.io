import React from 'react'
import './MainPage.scss'

const MainPage : React.FC<any> = () => {
    return (
        <div id="parent">
            <div id="child" className="ch"></div>
        </div>
    )
}

export default MainPage;