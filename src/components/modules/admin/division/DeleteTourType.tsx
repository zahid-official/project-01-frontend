import { Button } from "@/components/ui/button";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { useDeleteDivisionMutation } from "@/redux/features/division/division.api";
import { Trash2 } from "lucide-react";

const DeleteDivision = ({ id }: { id: string }) => {
  // RTK Query mutation hook
  const [deleteDivision] = useDeleteDivisionMutation();

  return (
    <div>
      <DeleteConfirmation
        mutationFn={() => deleteDivision(id).unwrap()}
        successMessage="Division deleted successfully"
      >
        <Button size="sm">
          <Trash2 />
        </Button>
      </DeleteConfirmation>
    </div>
  );
};

export default DeleteDivision;
