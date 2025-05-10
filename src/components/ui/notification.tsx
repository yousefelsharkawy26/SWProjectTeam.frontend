import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Bell } from 'lucide-react'
import { Badge } from './badge'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Link } from 'react-router-dom'
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import axios from "axios";
import UserProvider from "@/context/UserContext";

const Notification = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const token = localStorage.getItem("token") || context.token;
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }

    const fetchNotifications = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.get(`${apiUrl}/api/users/user-notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setNotifications(response.data);
      }).catch((error) => {
        console.error("Error fetching notifications:", error);
      });        
    }
    
    let connection: HubConnection;
    const createConnection = async () => {
      connection = await new HubConnectionBuilder()
      .withUrl(`${apiUrl}/notificationhub`, { 
        accessTokenFactory: () => token,
        transport: HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .build();

      await connection
        .start()
        .then(() => {
          console.log("SignalR connection established");
          connection.on("ReceiveNotification", (notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
          });
        })
        .catch((error) => console.log("Error establishing SignalR connection:", error));
    }
    
    if (token) {
      fetchNotifications();
      createConnection();
    }

    return () => {
      if (!token && connection) 
        connection.stop().then(() => console.log("SignalR connection stopped"));
    };
  }, [token, apiUrl]);
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">

        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 hover:text-dental-blue cursor-pointer" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-dental-blue text-[10px]">
            {notifications.length} 
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="mr-2 mt-2">
        <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification, i) => (
            <DropdownMenuItem key={i} className="flex items-center gap-3">
              <div className="flex flex-col w-28">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={ notification.imageUrl? apiUrl + "/images/" + notification.imageUrl: apiUrl + "/images/avatar.png"} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left hidden md:block">
                  <span className="text-xs font-small capitalize text-gray-500">{notification.name}</span>
                </div>
              </div>
              <div className="flex flex-col w-64">
                <span className="text-sm font-medium">{notification.title}</span>
                <span className="text-xs ">{notification.message}</span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-center">No notifications</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/notifications"  className="text-center">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default Notification