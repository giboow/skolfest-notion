import { useState } from "react";
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import classNames from "classnames";


interface CardComponentProps { title: string, content: string, link: string, image?: string, linkText?: string, className?: string }


const CardComponent = ({ title, content, link, image, linkText, className }: CardComponentProps) => {

    if (!linkText) linkText = "Lire la suite";

    return (
        <div className={classNames("card", className)}>
            {image &&
                <a href={link}>
                    <img className="card__image" src={image} alt="" />
                </a>}
                <a href={link}>
                    <h5 className="card__title">{title}</h5>
                </a>
            <div className="card__content">
                
                <p className="card__description">{content}</p>
                
            </div>
            <a href={link} className="card__link">
                    {linkText}
                    <ArrowSmallRightIcon className="card__link__icon" />
                </a>
        </div>
    )
}


export default CardComponent;