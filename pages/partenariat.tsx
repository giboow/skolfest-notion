import Title from "@/components/common/title.component";
import PartenariatService from "@/services/partenariat.service";



export const getStaticProps = async () => {
    const partenariaService = new PartenariatService();
    const partenaires = await partenariaService.getPartenaires();

    return {
        props: {
            partenaires,
        },
    }
}
const Partnariat = ({partenaires}: any) => {

    console.log(partenaires)
    return (<>
        <Title title="Partenariat" />
        <div className="grid grid-cols-1 lg:grid-cols-4  md:grid-cols-2 gap-4">
            Coucou
        </div>


    </>)

}

export default Partnariat;
