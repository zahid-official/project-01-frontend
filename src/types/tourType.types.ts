/*--------------------------
      Result Types
--------------------------*/
export interface TourTypeResponse {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/*--------------------------
      QueryArg Types
--------------------------*/
export interface ITourType {
  name: string;
}
