'use client'
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props ={ 
    item :{ id: string;
            label: string;
            icon: ReactNode;
            href:string;
            }
}
export function SidebarItemComponent( {item} : Props){
    const {id, label, icon, href} = item;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenu = () =>{
        setIsMenuOpen( (prev) => !prev);
    }

    return(
        <Link href={href} className={cn("flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg"

            , isMenuOpen || pathname === href 
            ? "text-white bg-white/10" 
            : "text-zinc-400"
         )} >
            {/* label 영역 */}
            <div className="flex items-center gap-2">
                {icon} 
                <div className=" w-[100px] truncate">
                    {label}
                </div>
            </div>
            
            {/* 드롭다운 영역 */}
            <div>
                {id !== 'new' && (
                    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <div onClick={handleMenu}>
                                <Ellipsis className={ cn( "group-hover:block text-gray-400 hover:text-white",
                                    isMenuOpen? "block text-white": "md:hidden text-gray-400" 
                                )}/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="gap-2">
                                <Pencil size={18}/>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Trash size={18}/>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </Link>
    );
}