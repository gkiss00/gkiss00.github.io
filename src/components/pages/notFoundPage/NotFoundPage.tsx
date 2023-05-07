import React, {useEffect} from "react";
import { useRouteError } from "react-router-dom";
import "./NotFoundPage.scss"

const NotFoundPage: React.FC<any> = () => {
    const error: unknown = useRouteError();

    
    return (
        <section id="notFoundPage" className="notFoundPage">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>
            {(error as Error)?.message || (error as { statusText?: string })?.statusText}
            </i>
            </p>
        </section>
    )
}

export default NotFoundPage;