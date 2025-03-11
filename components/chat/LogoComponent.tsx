import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";


export function LogoComponent(){
    return(
        <Link href={BASE_URL} className="flex items-center gap-2">
            <Image width={40} height={40} src="/logo.png" alt="로고"/>
            <h1 className="text-2xl font-bold">Chat GPT clone</h1>
        </Link>
    );
}