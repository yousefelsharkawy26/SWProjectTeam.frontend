import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, PencilLine } from "lucide-react";

const BillingInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your subscription plan and payment methods.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Current Plan</h4>
          <div className="bg-dental-light-blue/10 p-4 rounded-lg border border-dental-light-blue/30">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Professional Plan</h5>
                <p className="text-sm text-gray-500">$49.99/month</p>
              </div>
              <Badge className="bg-dental-blue">Active</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Payment Methods</h4>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <RadioGroup defaultValue="card1">
                <RadioGroupItem value="card1" id="card1" />
              </RadioGroup>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <PencilLine className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Billing History</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Oct 01, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $49.99
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-dental-blue hover:text-dental-dark-blue"
                    >
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Sep 01, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $49.99
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-dental-blue hover:text-dental-dark-blue"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingInfo;
