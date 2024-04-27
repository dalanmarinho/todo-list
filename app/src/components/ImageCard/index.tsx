import TestImage from "../../assets/01.jpg"

export function ImageCard() {
    return (
        <picture className="flex flex-col items-center justify-center relative">
            <img className="flex max-w-md sm:min-w-[320px] md:max-w-[380px] lg:max-w-[500px] rounded-md border-4 border-amber-400" 
                src={TestImage} alt="Imagem decorativa de um churrasco" width="100%" />
            <figcaption className="absolute bottom-2 text-xl bg-amber-300/85 font-Staatliches text-amber-900 px-1 rounded-md">Não existe trabalho ruim...</figcaption>
        </picture>
    )
}