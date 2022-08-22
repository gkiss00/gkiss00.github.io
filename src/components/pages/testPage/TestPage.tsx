import React, {useEffect} from "react";
import "./TestPage.scss"

const TestPage: React.FC<any> = () => {

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let testPage: HTMLElement;

    window.addEventListener('resize', handleResize);

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function addListener() {
        testPage.addEventListener('mousemove', function(e: MouseEvent){
            const circleRadius = 300;
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createRadialGradient(x,y,0, x,y,circleRadius);
            // Add three color stops
            gradient.addColorStop(0, 'blue');
            gradient.addColorStop(1, 'black');
            
            // Set the fill style and draw a rectangle
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    useEffect(() => {
        if(canvas == undefined) {
            testPage= document.getElementById("testPage") as HTMLElement;
            canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
            ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            addListener();
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    const hexaHeight = 50 + (2 * 14.43);
    let background = [];
    for (let i = 0; i < 3; ++i) {
        for(let j = 0; j < 100; ++j) {
            background.push(<div className="hexagon" style={{position: "absolute", top: i * 50 + "px", left: (i % 2) * 25 + j * 50 + "px"}}></div>)
        }
    }
    
    return (
        <section id="testPage" className="testPage">
            <canvas id="myCanvas" height={500} width={500}>
                
            </canvas>
            <div className="testDiv"></div>
                <div className="background">
                {background}
            </div>
        </section>
    )
}

export default TestPage;