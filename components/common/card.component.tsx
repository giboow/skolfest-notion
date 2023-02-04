import { useState } from "react";
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import classNames from "classnames";


interface CardComponentProps { title: string, content: string, link: string, linkText?: string, className?: string  }


const CardComponent = ({title, content, link, linkText, className}: CardComponentProps) => {
    
    if(!linkText) linkText = "Lire la suite";

    return (
        <div className={classNames("card", className)}>
            <a href={link}>
                <h5 className="card__title">{title}</h5>
            </a>
            <p className="card__content">{content}</p>
            <a href={link} className="card__link">
                {linkText}
                <ArrowSmallRightIcon className="card__link__icon"/>
            </a>
        </div>
    )
}


export default CardComponent;