import { ArrowSmallRightIcon, ClockIcon } from '@heroicons/react/24/solid'
import classNames from "classnames";
import { DateTime } from "luxon"


interface CardComponentProps { title: string, date: string, content: string, link: string, image?: string, linkText?: string, className?: string }


const CardComponent = ({ title, date, content, link, image, linkText, className }: CardComponentProps) => {

    if (!linkText) linkText = "Lire la suite";
    return (
        <div className={classNames("card", className)}>

            <a href={link}>
                <img className="card__image" src={image || "/images/default.jpg"} alt="" />
            </a>
            <a href={link}>
                <h5 className="card__title">{title}</h5>
            </a>
            <div className="card__meta">
                <div className="card__meta-datetime">
                    <ClockIcon className="card__meta-datetime-icon"></ClockIcon>
                    <time className="card__meta-datetime-time" dateTime={date}>
                        {DateTime.fromISO(date).setLocale('fr').toFormat('yyyy LLLL dd')}
                    </time>
                </div>
            </div>
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