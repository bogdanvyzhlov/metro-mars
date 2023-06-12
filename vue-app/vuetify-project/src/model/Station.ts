export interface Station {
  _id: string;
  name: string;
  status: string;
  aboutWork: string;
  coordinates: {x:number;
                y:number};
  neighbors:string[];
};
