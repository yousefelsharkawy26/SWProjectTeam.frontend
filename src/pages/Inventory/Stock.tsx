import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IInventory, Stock as IStock } from "@/types/Inventory";
import { CalendarDays, Plus } from "lucide-react";

interface StockProps {
  inventoryItem: IStock[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddItem: (item: IInventory) => void;
}

const Stock = ({ inventoryItem, open, onOpenChange, handleAddItem }) => {
  const handleAdd = (item: IInventory) => {
    handleAddItem(item);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stock Of {inventoryItem?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {inventoryItem?.stocks.map((stock, index) => {
            const isLowStock = stock?.quantity < inventoryItem?.minimumLevel;
            const isExpiringSoon =
              stock?.expiryDate &&
              new Date(stock?.expiryDate) <
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

            const isExpired =
              stock?.expiryDate &&
              new Date(stock?.expiryDate) < new Date(Date.now());

            return (
              <div
                key={stock?.id}
                className={`border p-4 rounded-md ${
                  !isExpired && !isExpiringSoon
                    ? "bg-green-50 border-green-100"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="flex items-center gap-3">
                      <CalendarDays
                        className={`h-5 w-5 ${
                          !isExpired && !isExpiringSoon
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium">Stock {index + 1}</h4>
                        <p className="text-sm text-gray-500">
                          {stock?.quantity + " " + inventoryItem?.unit}
                        </p>
                        <p className="text-sm text-gray-500">
                          {stock?.expiryDate}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 ml-8 text-sm">
                      <p>Added at</p>
                      <p>{stock?.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {(isExpired || isLowStock) && (
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    )}

                    <div className="flex flex-col ml-2">
                      {isLowStock && (
                        <Badge variant="destructive" className="mb-1">
                          Low Stock
                        </Badge>
                      )}
                      {(isExpired && (
                        <Badge variant="destructive">Expierd</Badge>
                      )) ||
                        (isExpiringSoon && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Expiring Soon
                          </Badge>
                        ))}
                      {!isLowStock && !isExpiringSoon && !isExpired && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          In Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-4">
            <Button onClick={() => handleAdd(inventoryItem)} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add New Stock</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Stock;
