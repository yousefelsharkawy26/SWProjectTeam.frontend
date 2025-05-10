
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, InfoIcon, BoxIcon, PenIcon } from "lucide-react";
import { toast } from "sonner";
import PostCard from "../Posts/PostCard";
import { Post } from "../Posts/Posts";
import { useNavigate } from "react-router-dom";
import UserProvider from "@/context/UserContext";
import axios from "axios";

const MyAccount = () => {
  const context = UserProvider.useUser();
  const user = context.user;
  const token = context.token;
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  
  const handleSaveChanges = () => {
    toast.success("Account information updated successfully");
  };

  const handleLikePost = async (postId: number) => {
    await axios.get(`${apiUrl}/api/post/add-like?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() =>
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          };
        }
        return post;
      })
    )).catch(err => console.log(err));
  };

  useEffect(() => {
    const fetchAccountPosts = async () => {
      await axios.get(`${apiUrl}/api/post`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setPosts(res.data);
      }).catch(err => console.log(err));
    }
    fetchAccountPosts();
  }, [apiUrl, token])
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <Button onClick={() => navigate('/settings')}>Edit Profile</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={user?.imageUrl? apiUrl + '/images/' +user?.imageUrl: 'placeholder.svg'} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user?.firstname + ' ' + user?.lastname}</h2>
                  {/* <p className="text-sm text-gray-500 mt-1">Dental Surgeon</p> */}
                  <Badge className="mt-2 bg-dental-blue capitalize">{user?.permission}</Badge>
                  
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.firstname + ' ' + user?.lastname}</p>
                  </div>
                </div>

                {user?.professionalTitle && 
                  <div className="flex items-center">
                    <PenIcon className="h-4 w-4 text-gray-500 mr-3"/>
                    <div>
                      <p className="text-sm text-gray-500">Professional Title</p>
                      <p className="font-medium">{user.professionalTitle}</p>
                    </div>
                </div>
                }
                {user?.specialization && 
                  <div className="flex items-center">
                    <BoxIcon className="h-4 w-4 text-gray-500 mr-3"/>
                    <div>
                      <p className="text-sm text-gray-500">Specialization</p>
                      <p className="font-medium">{user.specialization}</p>
                    </div>
                </div>
                }
                
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                {user?.phone && 
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                }
                
                {
                  user?.createdAt &&
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">June 15, 2020</p>
                    </div>
                  </div> 
                }

                {
                  user?.bio && 
                  <div className="flex items-center">
                    <InfoIcon className="h-4 w-4 text-gray-500 mr-3"/>
                    <div>
                      <p className="text-sm text-gray-500">Professional Bio</p>
                      <p className="font-medium">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                }
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">  
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={() => handleLikePost(post.id)} 
              />
            ))}

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyAccount;
