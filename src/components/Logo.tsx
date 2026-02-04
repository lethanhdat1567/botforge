import { images } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

function Logo({ isWhite = false }: { isWhite?: boolean }) {
    return (
        <Link href="/">
            <div className="flex items-center gap-2 text-lg font-bold">
                <Image
                    src={isWhite ? images.logoWhite : images.logoBlack}
                    alt="Botforge"
                    width={100}
                    height={100}
                    className="h-7 w-7 object-cover"
                />{" "}
                Botforge
            </div>
        </Link>
    );
}

export default Logo;
