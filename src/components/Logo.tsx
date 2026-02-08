"use client";

import { images } from "@/assets/images";
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
                className="flex cursor-pointer items-center gap-2 text-lg font-bold"
                initial="rest"
                animate="rest"
                whileHover="hover"
            >
                {/* Icon */}
                <motion.div variants={logoVariants}>
                    <Image
                        src={isWhite ? images.logoWhite : images.logoBlack}
                        alt="Botforge"
                        width={100}
                        height={100}
                        className="h-7 w-7 object-cover"
                    />
                </motion.div>

                {/* Text */}
                <span>Botforge</span>
            </motion.div>
        </Link>
    );
}

export default Logo;
