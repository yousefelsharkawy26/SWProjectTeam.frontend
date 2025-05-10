
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import ConnectDatabaseInfo from '@/components/database/ConnectDatabaseInfo';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const DatabaseSettings = () => {
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" /> 
            Database Connection
          </CardTitle>
          <CardDescription>
            Configure your database connection for storing dental clinic data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Status: <span className="text-destructive font-medium">Not Connected</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Connect your application to a database to store and manage clinic data
              </p>
            </div>
            <Button onClick={() => setShowConnectDialog(true)}>
              <Database className="mr-2 h-4 w-4" />
              Connect Database
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <ConnectDatabaseInfo onClose={() => setShowConnectDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DatabaseSettings;
