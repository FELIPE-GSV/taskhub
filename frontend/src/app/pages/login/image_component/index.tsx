import Image from "next/image";
import ImageLogin from "../../../../assets/ImagemProjetoLogin.jpg"

export function ImageComponent() {
    return (
        <div className="w-1/2 h-[50vh] bg-red-500 relative lg:h-[100vh]">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-950 opacity-30 flex flex-col justify-end items-center">
                {/* <h1 className="text-5xl font-bold text-white">Transforme suas ideias em <p>resultados concretos</p></h1>
                <p>gerencie projetos, orgenize tarefas e colabore com sua equipe de forma intuitiva e eficiente com o TaskHub.</p>
                <ul>
                    <li>Projetos orgenizados</li>
                    <li>Colaboração em tempo real</li>
                </ul> */}
            </div>
            <Image
                src={ImageLogin.src}
                width={500}
                height={500}
                alt="Imagem de login"
                className="w-full h-[50vh] object-cover lg:h-[100vh]"
            />
        </div>
    )
}