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
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const divisionZodSchema = z.object({
  // Email
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),

  // Description
  description: z
    .string({ error: "Description must be string" })
    .max(500, { error: "Description cannot exceed 500 characters." })
    .trim()
    .optional(),
});

const AddDivisionModal = () => {
  // State for loading & modalOpen
  const [isLoading, setIsloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // RTK Query mutation hook
  const [createDivision] = useCreateDivisionMutation();

  // useForm hook
  const form = useForm<z.infer<typeof divisionZodSchema>>({
    resolver: zodResolver(divisionZodSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Handle onsubmit
  const onsubmit = async (data: z.infer<typeof divisionZodSchema>) => {
    setIsloading(true);

    try {
      const result = await createDivision(data).unwrap();
      console.log(result);
      toast.success(result.message || "Division successfully");
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
            <Button>Add Division</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md px-7 py-12">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Add Division</DialogTitle>
              <DialogDescription>
                Create a new division by name, description, thumbnail and saving
                it in the system.
              </DialogDescription>
            </DialogHeader>

            {/* Form body */}
            <div className="grid gap-6">
              <Form {...form}>
                <form
                  id="addDivision"
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Division Name
                          <span className="text-red-500 -ml-1 -mt-1.5">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter division name" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter a name that describes this division.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief description (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Describe the purpose or scope of this division.
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
                form="addDivision"
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddDivisionModal;
