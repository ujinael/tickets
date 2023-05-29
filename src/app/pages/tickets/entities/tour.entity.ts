export class Tour{
    constructor(
        public id = '',
        public name:string ='',
        public description:string ='',
        public tourOperator:string='',
        public img:string,
        public price:string ='',
        public type:string = '',
        public date:string = ''
    ){}
}
export class NearestTour extends Tour{
  locationId:string
}
export interface ITourLocation{
  name:string
  id:string
}
export interface ICustomTourLocation extends NearestTour {
  regions: ITourLocation;
}
export interface ITourTypeSelect {
    label: string,
    value: string,
    date?:string
  }
