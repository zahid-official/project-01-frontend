import AddTourModal from "@/components/modules/admin/tour/AddTourModal";
import DeleteTour from "@/components/modules/admin/tour/DeleteTour";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";

const Tours = () => {
  // RTK Query mutation hook
  const { data } = useGetAllToursQuery(undefined);

  return (
    <div className="max-w-4xl w-full mx-auto pt-8">
      {/* heading */}
      <div className="flex justify-between items-center gap-2 pb-3.5 px-1.5">
        <h2 className="text-xl font-bold">Tours</h2>

        {/* Add tour modal */}
        <AddTourModal />
      </div>

      {/* Table */}
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item: { _id: string; title: string }) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {/* delete tour */}
                  <DeleteTour id={item._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tours;
