import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {
  isLoading: boolean;
  value: string;
  loadingValue: string;
}

const ButtonSubmit = ({ isLoading, value, loadingValue }: IProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      data-loading={isLoading || undefined}
      className="w-full cursor-pointer disabled:opacity-100"
    >
      {isLoading ? (
        <div className="flex gap-1 items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
          {loadingValue}
        </div>
      ) : (
        value
      )}
    </Button>
  );
};

export default ButtonSubmit;
