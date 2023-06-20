import Title from "@/components/common/title.component";
import PartenariatService from "@/services/partenariat.service";
import {Partenaire} from "@/@types/schema";
import PartenaireComponent from "@/components/common/partenaire.component";



export const getStaticProps = async () => {
    const partenariaService = new PartenariatService();
    const partenaires = await partenariaService.getPartenaires();
    return {
        props: {
            partenaires,
        },
    }
}

interface PartenairesProps {
    partenaires: Partenaire[]
}

const Partnariat = ({partenaires}: PartenairesProps) => {

    return (<>
        <Title title="Partenariat" />
        <div className="grid grid-cols-1 lg:grid-cols-4  md:grid-cols-2 gap-4">
            {partenaires.map((p, i) =>
                <PartenaireComponent key={i} partenaire={p} />
            )}
        </div>


    </>)

}

export default Partnariat;
