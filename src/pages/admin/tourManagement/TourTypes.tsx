import AddTourTypeModal from "@/components/modules/admin/tourTypes/AddTourTypeModal";
import DeleteTourType from "@/components/modules/admin/tourTypes/DeleteTourType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTourTypesQuery } from "@/redux/features/tourType/tourType.api";

// Interface for table item
export interface TableItem {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const TourTypes = () => {
  // RTK Query mutation hook
  const { data } = useGetAllTourTypesQuery(undefined);

  return (
    <div className="max-w-4xl w-full mx-auto pt-8">
      {/* Add tour-type */}
      <div className="flex justify-between items-center gap-2 pb-3.5 px-1.5">
        <h2 className="text-xl font-bold">Tour Types</h2>

        {/* Add tour-type modal */}
        <AddTourTypeModal />
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
            {data?.data.map((item: TableItem) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {/* delete tour type */}
                  <DeleteTourType id={item._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TourTypes;
