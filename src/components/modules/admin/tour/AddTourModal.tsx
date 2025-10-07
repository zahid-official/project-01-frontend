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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, formatISO, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCreateTourMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useGetAllDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetAllTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

// Zod schema
const tourZodSchema = z.object({
  // Title
  title: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),

  // Division Id
  divisionId: z.string().min(2, { error: "Division must be selected" }),

  // TourType Id
  tourTypeId: z.string().min(2, { error: "Tour type must be selected" }),

  // Start Date
  startDate: z.date({ error: "Start date is required" }),

  // End Date
  endDate: z.date({ error: "End date is required" }),
});

const AddTourModal = () => {
  // States from react
  const [isLoading, setIsloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // RTK Query mutation hook
  const [createTour] = useCreateTourMutation();
  const { data: divisionData, isLoading: divisionLoading } =
    useGetAllDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetAllTourTypesQuery(undefined);

  // useForm hook
  const form = useForm<z.infer<typeof tourZodSchema>>({
    resolver: zodResolver(tourZodSchema),
    defaultValues: {
      title: "",
      divisionId: "",
      tourTypeId: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  // Handle onsubmit
  const onsubmit = async (data: z.infer<typeof tourZodSchema>) => {
    setIsloading(true);
    const tourInfo = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourInfo));

    try {
      const result = await createTour(formData).unwrap();
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
            <Button>Add Tour</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md px-7 py-12">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Add Tour</DialogTitle>
              <DialogDescription>
                Create a new tour by entering a title and saving it in the
                system.
              </DialogDescription>
            </DialogHeader>

            {/* Form body */}
            <div className="grid gap-6">
              <Form {...form}>
                <form
                  id="addTour"
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="space-y-6"
                >
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tour title" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter a title that describes this tour.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Division */}
                  <FormField
                    control={form.control}
                    name="divisionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Division</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={divisionLoading}
                        >
                          {/* select trigger */}
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a division" />
                            </SelectTrigger>
                          </FormControl>

                          {/* select content */}
                          <SelectContent>
                            {divisionData?.data?.map(
                              (item: { _id: string; name: string }) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tour TYpe */}
                  <FormField
                    control={form.control}
                    name="tourTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Tour Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={tourTypeLoading}
                        >
                          {/* select trigger */}
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a tour type" />
                            </SelectTrigger>
                          </FormControl>

                          {/* select content */}
                          <SelectContent>
                            {tourTypeData?.data?.map(
                              (item: { _id: string; name: string }) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover
                          open={startDateOpen}
                          onOpenChange={setStartDateOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setStartDateOpen(false);
                              }}
                              disabled={(date) =>
                                isBefore(
                                  startOfDay(date),
                                  startOfDay(new Date())
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover
                          open={endDateOpen}
                          onOpenChange={setEndDateOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setEndDateOpen(false);
                              }}
                              disabled={(date) =>
                                isBefore(
                                  startOfDay(date),
                                  startOfDay(new Date())
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
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
                form="addTour"
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTourModal;
