export interface Stock {
  id: number;
  quantity: number;
  expiryDate: string;
  createdAt: string;
}

export interface IInventory {
  id: number;
  name: string;
  category: string;
  totalQuantity: number;
  closelyExpiryDate: string;
  unit: string;
  minimumLevel: number;
  supplier: string;
  lastReStockedDate: string;
  stocks: Stock;
  createdAt: Date;
}
