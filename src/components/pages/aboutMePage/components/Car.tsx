import './Car.scss'

const Car: React.FC<any> = () => {
    return (
        <div className="car">
            <div className="carBodyFront"></div>
            <div className="carBodyBack"></div>
            <div className="carTopFront"></div>
            <div className="carTopBack"></div>
            <div className="carFrontWindow"></div>
            <div className="carBackWindow"></div>
            <div className="carWheel carFrontWheel">
                <div className='carRim carFrontRim'></div>
            </div>
            <div className="carWheel carBackWheel">
                <div className='carRim carBackRim'></div>
            </div>
            <div className='carSparePot'></div>
        </div>
    )
}

export default Car;