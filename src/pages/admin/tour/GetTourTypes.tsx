import { useGetAllTourTypesQuery } from "@/redux/features/tour/tour.api";

const GetTourTypes = () => {
  const { data } = useGetAllTourTypesQuery(undefined);
  console.log(data);
  return <div>all tour types get</div>;
};

export default GetTourTypes;
