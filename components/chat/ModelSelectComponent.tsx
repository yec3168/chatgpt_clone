import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const MODELS = [ 'gpt-3.5-turbo', 'gpt-4', 'gpt-4o']
export function ModelSelectComponent(){
    return(
        <div>
            <Select>
                <SelectTrigger className="w-[180px] border-none focus:ring-transparent text-lg">
                    <SelectValue placeholder="모델선택" />
                </SelectTrigger>
                <SelectContent >
                    {MODELS.map((model) =>(
                        <SelectItem key={model} value={model}>
                            {model} 
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}