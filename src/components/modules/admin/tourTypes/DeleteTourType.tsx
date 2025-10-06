/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDeleteTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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
      <Button onClick={handleDelete} size="sm">
        <Trash2 />
      </Button>
    </div>
  );
};

export default DeleteTourType;
