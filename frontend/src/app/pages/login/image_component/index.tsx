import Image from "next/image";
import ImageLogin from "../../../../assets/ImagemProjetoLogin.jpg"

export function ImageComponent() {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[100vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-sky-600/20 to-indigo-600/30 z-10" />
            <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Pessoa organizando tarefas"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20" />
            <div className="absolute bottom-8 left-8 z-30 text-white">
                <h2 className="text-4xl font-bold mb-4 leading-tight">
                    Transforme suas ideias em
                    <span className="block bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text text-transparent">
                        resultados concretos
                    </span>
                </h2>
                <p className="text-lg opacity-90 max-w-md leading-relaxed">
                    Gerencie projetos, organize tarefas e colabore com sua equipe
                    de forma intuitiva e eficiente com o TaskHub.
                </p>
                <div className="flex items-center mt-8 space-x-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full shadow-lg"></div>
                        <span className="ml-3 text-sm font-medium">Projetos organizados</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full shadow-lg"></div>
                        <span className="ml-3 text-sm font-medium">Colaboração em tempo real</span>
                    </div>
                </div>
            </div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-full blur-xl z-5"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-sky-400/20 to-indigo-400/20 rounded-full blur-lg z-5"></div>
        </div>
    )
}