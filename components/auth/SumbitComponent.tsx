import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type MyButtonProps = React.ComponentProps<typeof Button>;

export function SubmitComponent( {children, ...othrers}: MyButtonProps){
    const {pending} = useFormStatus();
    return (
        <>
            <Button type="submit" disabled={pending} {...othrers}>
                {children}
            </Button>
        </>
    );
}