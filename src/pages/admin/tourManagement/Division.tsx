import AddDivisionModal from "@/components/modules/admin/division/AddDivision";
import DeleteDivision from "@/components/modules/admin/division/DeleteTourType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDivisionsQuery } from "@/redux/features/division/division.api";

// Table interface
interface TableItems {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

const Division = () => {
  // RTK Query mutation hook
  const { data } = useGetAllDivisionsQuery(undefined);

  return (
    <div className="max-w-4xl w-full mx-auto pt-8">
      {/* Add tour-type */}
      <div className="flex justify-between items-center gap-2 pb-3.5 px-1.5">
        <h2 className="text-xl font-bold">Divisions</h2>

        {/* Add tour-type modal */}
        <AddDivisionModal />
      </div>

      {/* Table */}
      <div className="border border-muted rounded-md">
        <Table>
          {/* table header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {data?.data.map((item: TableItems) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {/* delete tour type */}
                  <DeleteDivision id={item._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Division;
