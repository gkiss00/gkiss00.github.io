import { Link } from 'react-router-dom';
import './NavBar.scss'

const NavBar: React.FC<any> = () => {
    return (
        <ul className='navbar'>
            <li className='navbarLink'><Link to="/"><a href="#aboutMeSection">About me</a></Link></li>
            <li className='navbarLink'><a href="#skillsSection">skills</a></li>
            <li className='navbarLink'><a href="#formationSection">Education</a></li>
            <li className='navbarLink'><a href="#experienceSection">Experiences pro</a></li>
            <li className='navbarLink'><a href="#otherSection">Passion & loisirs</a></li>
            <li className='navbarLink'><Link to="visites">Visite</Link></li>
            <li className='navbarLink'><a href={require('./cv.pdf')} download="cv-benoit-haubruge">CV</a></li>
            <li className='navbarLink'><a href={require('./cv.pdf')} target='_blank' rel='noopener noreferrer'>My CV</a></li>
            <li className='navbarLink'><a href={require('./../../tfe.pdf')} download="tfe-benoit-haubruge">TFE</a></li>
            <li className='navbarLink'><a href={require('./../../tfe.pdf')} target='_blank' rel='noopener noreferrer'>My TFE</a></li>
        </ul>
    )
}

export default NavBar;