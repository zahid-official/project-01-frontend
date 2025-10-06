/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDeleteTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IProps {
  id: string;
}

const DeleteTourType = ({ id }: IProps) => {
  // RTK Query mutation hook
  const [deleteTourType] = useDeleteTourTypeMutation();

  // handleDelete
  const handleDelete = async () => {
    try {
      const result = await deleteTourType(id).unwrap();
      console.log(result);
      toast.success(result.message || "Tour Type created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove tour
              type's data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteTourType;
