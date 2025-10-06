/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const tourTypeZodSchema = z.object({
  // Email
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),
});

const AddTourTypeModal = () => {
  // State for loading & modalOpen
  const [isLoading, setIsloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // RTK Query mutation hook
  const [createTourType] = useCreateTourTypeMutation();

  // useForm hook
  const form = useForm<z.infer<typeof tourTypeZodSchema>>({
    resolver: zodResolver(tourTypeZodSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handle onsubmit
  const onsubmit = async (data: z.infer<typeof tourTypeZodSchema>) => {
    setIsloading(true);

    try {
      const result = await createTourType(data).unwrap();
      console.log(result);
      toast.success(result.message || "Tour Type created successfully");
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form>
          <DialogTrigger asChild>
            <Button>Add Tour Type</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md px-7 py-12">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Add Tour Type</DialogTitle>
              <DialogDescription>
                Create a new tour type by entering a name and saving it in the
                system.
              </DialogDescription>
            </DialogHeader>

            {/* Form body */}
            <div className="grid gap-6">
              <Form {...form}>
                <form
                  id="addTourType"
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Type Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tour type name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter a name that describes this tour type.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            {/* Dialog footer */}
            <DialogFooter className="mt-1.5 border">
              {/* Submit btn */}
              <ButtonSubmit
                isLoading={isLoading}
                value="Submit"
                loadingValue="Submitting"
                form="addTourType"
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTourTypeModal;
