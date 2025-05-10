import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Plus, Package, AlertCircle } from "lucide-react";
import AddNewInventory from "./AddNewInventory";
import Restock from "./Restock";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { format, isSameMonth } from "date-fns";
import InventoryProvider from "@/context/InventoryContext";
import { IInventory } from "@/types/Inventory";
import Stock from "./Stock";

const Inventory = () => {
  const { inventories, setChanged } = InventoryProvider.useInventory();
  const [open, setOpen] = useState(false);
  const [openStockDailog, setOpenStockDailog] = useState(false);
  const [openRestockDailog, setOpenRestockDailog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = inventories?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestock = (item: IInventory) => {
    setSelectedItem(item);
    setOpenRestockDailog(true);
  };

  const handleView = (item: IInventory) => {
    setSelectedItem(item);
    setOpenStockDailog(true);
  };

  useEffect(() => {
    setChanged(!open && !openRestockDailog && !openStockDailog);
  }, [openRestockDailog, open, openStockDailog]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Inventory Management
          </h1>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
          <AddNewInventory open={open} onOpenChanged={setOpen} />
          <Restock
            open={openRestockDailog}
            onOpenChanged={setOpenRestockDailog}
            selectedItem={selectedItem}
          />
          <Stock
            inventoryItem={selectedItem}
            open={openStockDailog}
            onOpenChange={setOpenStockDailog}
            handleAddItem={handleRestock}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-dental-light-blue/10">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Items
                  </p>
                  <h3 className="text-2xl font-bold">{inventories?.length}</h3>
                </div>
                <div className="bg-dental-light-blue/20 p-3 rounded-full">
                  <Package className="h-6 w-6 text-dental-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Low Stock Items
                  </p>
                  <h3 className="text-2xl font-bold">
                    {inventories?.reduce((total, item) => {
                      const isLowStock =
                        item?.totalQuantity < item?.minimumLevel;
                      if (isLowStock) total += 1;
                      return total;
                    }, 0)}
                  </h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Orders This Month
                  </p>
                  <h3 className="text-2xl font-bold">
                    {inventories?.reduce((total, item) => {
                      if (isSameMonth(item?.createdAt, new Date(Date.now()))) total += 1;
                        return total;
                    }, 0)}
                  </h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inventory by name, category, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const isLowStock = item?.totalQuantity < item?.minimumLevel;
                  const isExpiringSoon =
                    item?.closelyExpiryDate &&
                    new Date(item?.closelyExpiryDate) <
                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                  const isExpired =
                    item?.closelyExpiryDate &&
                    new Date(item?.closelyExpiryDate) < new Date(Date.now());

                  return (
                    <TableRow key={item?.id}>
                      <TableCell className="font-medium">
                        {item?.name}
                      </TableCell>
                      <TableCell>{item?.category}</TableCell>
                      <TableCell>
                        <span
                          className={
                            isLowStock ? "text-red-500 font-medium" : ""
                          }
                        >
                          {item?.totalQuantity} {item?.unit}
                        </span>
                      </TableCell>
                      <TableCell>{item?.supplier}</TableCell>
                      <TableCell>{item?.lastReStockedDate}</TableCell>
                      <TableCell>{item?.closelyExpiryDate || "N/A"}</TableCell>
                      <TableCell>
                        {isLowStock && (
                          <Badge variant="destructive">Low Stock</Badge>
                        )}
                        {(isExpired && (
                          <Badge variant="destructive">Expierd</Badge>
                        )) ||
                          (isExpiringSoon && (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 ml-1"
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
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => handleView(item)}
                          size="sm"
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleRestock(item)}
                          size="sm"
                        >
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Inventory;
