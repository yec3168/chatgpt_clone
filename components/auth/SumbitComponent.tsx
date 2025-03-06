import { Button } from "../ui/button";

type MyButtonProps = React.ComponentProps<typeof Button>;

export function SubmitComponent( {children, ...othrers}: MyButtonProps){
    return (
        <>
            <Button type="submit" {...othrers}>
                {children}
            </Button>
        </>
    );
}