export interface CommodityFormData {
  display_name: string;
  code: string;
}

export interface CommodityFormDataWithID extends CommodityFormData {
  id: number;
}
