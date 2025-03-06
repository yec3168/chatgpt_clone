import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import Link from "next/link";
// import { Link } from "lucide-react"; //마크형식.

type props ={
    title: string, // 상단 제목
    footer: {label: string, href: string},  // 하단의 올 링크.
    children : React.ReactNode, //본문내용.
}

export function FormCard( {title, footer, children} : props){
    return(
        <>
            <Card className="w-[500px] flex flex-col items-center border">
                <CardHeader >
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="w-[90%]">
                    {children}
                </CardContent>
                <CardFooter>
                    <Link href={footer.href} className="text-sm text-sky-800">
                        {footer.label}
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}