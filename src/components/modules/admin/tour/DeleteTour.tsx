import { Button } from "@/components/ui/button";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { useDeleteTourMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

const DeleteTour = ({ id }: { id: string }) => {
  // RTK Query mutation hook
  const [deleteTour] = useDeleteTourMutation();

  return (
    <div>
      <DeleteConfirmation
        mutationFn={() => deleteTour(id).unwrap()}
        successMessage="Tour deleted successfully"
      >
        <Button size="sm">
          <Trash2 />
        </Button>
      </DeleteConfirmation>
    </div>
  );
};

export default DeleteTour;
