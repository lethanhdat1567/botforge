"use client";

import { images } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const logoVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
};

function Logo({ isWhite = false }: { isWhite?: boolean }) {
    return (
        <Link href="/">
            <motion.div
                className={cn(
                    "flex cursor-pointer items-center gap-2 text-lg font-bold",
                    !isWhite && "text-foreground",
                )}
                initial="rest"
                animate="rest"
                whileHover="hover"
            >
                {/* Icon — theme: .dark trên <html> (next-themes) */}
                <motion.div variants={logoVariants} className="relative h-7 w-7 shrink-0">
                    {isWhite ? (
                        <Image
                            src={images.logoWhite}
                            alt="Botforge"
                            width={100}
                            height={100}
                            className="h-7 w-7 object-cover"
                        />
                    ) : (
                        <>
                            <Image
                                src={images.logoBlack}
                                alt=""
                                width={100}
                                height={100}
                                className="h-7 w-7 object-cover dark:hidden"
                                aria-hidden
                            />
                            <Image
                                src={images.logoWhite}
                                alt="Botforge"
                                width={100}
                                height={100}
                                className="hidden h-7 w-7 object-cover dark:block"
                            />
                        </>
                    )}
                </motion.div>

                {/* Text */}
                <span>Botforge</span>
            </motion.div>
        </Link>
    );
}

export default Logo;
