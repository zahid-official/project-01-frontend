import { Button } from "@/components/ui/button";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { useDeleteTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import { Trash2 } from "lucide-react";

const DeleteTourType = ({ id }: { id: string }) => {
  // RTK Query mutation hook
  const [deleteTourType] = useDeleteTourTypeMutation();

  return (
    <div>
      <DeleteConfirmation
        mutationFn={() => deleteTourType(id).unwrap()}
        successMessage="TourType deleted successfully"
      >
        <Button size="sm">
          <Trash2 />
        </Button>
      </DeleteConfirmation>
    </div>
  );
};

export default DeleteTourType;
