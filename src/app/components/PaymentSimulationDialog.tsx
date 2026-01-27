
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

interface PaymentSimulationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    onFailure: () => void;
}

export function PaymentSimulationDialog({
    open,
    onOpenChange,
    onSuccess,
    onFailure,
}: PaymentSimulationDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Payment Simulation</AlertDialogTitle>
                    <AlertDialogDescription>
                        This is a demonstration environment. Please select the outcome you wish to simulate.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <Button variant="destructive" onClick={onFailure}>
                            Simulate Failure
                        </Button>
                        <Button className="bg-[#064c4c] hover:bg-[#053a3a]" onClick={onSuccess}>
                            Simulate Success
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
