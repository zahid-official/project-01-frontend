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
      className="w-full cursor-pointer group relative disabled:opacity-100"
    >
      <span className="group-data-loading:text-transparent">{value}</span>
      {isLoading && (
        <div className="absolute gap-1 inset-0 flex items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
          {loadingValue}
        </div>
      )}
    </Button>
  );
};

export default ButtonSubmit;
