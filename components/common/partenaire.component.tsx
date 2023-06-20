import {Partenaire} from "@/@types/schema";
import classnames from "classnames";


interface PartenaireProps {
    partenaire: Partenaire,
    className?: string
}

const PartenaireComponent = ({partenaire, className}: PartenaireProps) => (
    <div className={classnames("card", className)}>
        <a href={partenaire.link || '#'} target={partenaire.link ? "_blank" : undefined}>
            <h5 className="card__title">{partenaire.name}</h5>
            <img className="card__image" src={partenaire.image || "/images/default.jpg"} alt=""/>
            <div className="card__content">
                <p className="card__description">{partenaire.address}</p>
            </div>
        </a>
    </div>
);

export default PartenaireComponent;
