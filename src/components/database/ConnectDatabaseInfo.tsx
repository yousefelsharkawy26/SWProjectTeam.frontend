
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { CheckCircle, Database, Server, ShieldCheck, Code } from "lucide-react";

interface ConnectDatabaseInfoProps {
  onClose: () => void;
}

const ConnectDatabaseInfo = ({ onClose }: ConnectDatabaseInfoProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <CardTitle>Connect to a Database</CardTitle>
        </div>
        <CardDescription>
          Choose a database solution for storing and retrieving your dental clinic data.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="supabase">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="supabase">Supabase</TabsTrigger>
            <TabsTrigger value="firebase">Firebase</TabsTrigger>
            <TabsTrigger value="custom">Custom Backend</TabsTrigger>
          </TabsList>
          
          <TabsContent value="supabase" className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-md flex items-start gap-3">
              <div className="mt-1 text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Recommended Solution</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Supabase provides an open source Firebase alternative with PostgreSQL database,
                  authentication, instant APIs, realtime subscriptions, and storage.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">PostgreSQL Database</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full PostgreSQL database with powerful features like foreign keys, 
                  stored procedures, and triggers.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Authentication</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built-in authentication with row-level security policies for data access control.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Instant APIs</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Auto-generated RESTful and GraphQL APIs without writing any backend code.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Realtime Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Listen to database changes and sync data across all connected clients in realtime.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Getting Started with Supabase</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Sign up for a free Supabase account at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">supabase.com</a></li>
                <li>Create a new project and note your project URL and API key</li>
                <li>Design your database schema for patients, appointments, treatments, etc.</li>
                <li>Install the Supabase client: <code className="bg-muted p-1 rounded">npm install @supabase/supabase-js</code></li>
                <li>Initialize the client in your application with your project details</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="firebase" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium">Cloud Firestore</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  NoSQL, document-oriented database for storing and syncing data.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium">Authentication</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Easy authentication with multiple providers (email, Google, etc.).
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Getting Started with Firebase</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Create a Firebase account at <a href="https://firebase.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">firebase.google.com</a></li>
                <li>Create a new project and register your application</li>
                <li>Install the Firebase SDK: <code className="bg-muted p-1 rounded">npm install firebase</code></li>
                <li>Initialize Firebase in your application with your project config</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Custom Backend Options</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you prefer to implement your own backend solution, here are some popular options:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Express.js + MongoDB</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Build a Node.js backend with Express and MongoDB for a flexible NoSQL solution.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Django + PostgreSQL</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use Django's robust ORM with PostgreSQL for a reliable relational database setup.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Laravel + MySQL</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Build a PHP-based backend with Laravel and MySQL for a traditional stack.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>
          <Database className="mr-2 h-4 w-4" />
          Connect Database
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectDatabaseInfo;
