import { ClipboardList } from "lucide-react";
import LoadingGif from "../../assets/loading.gif";

export function Loading() {
    return (
            <div className="w-full h-full absolute inset-x-0 inset-y-0  bg-custom-gray-400/[.45] flex flex-col  items-center justify-center text-center text-balance  text-custom-gray-300">
                <img src={LoadingGif} alt="loading.gif" width={65} />
            </div>
    )
}