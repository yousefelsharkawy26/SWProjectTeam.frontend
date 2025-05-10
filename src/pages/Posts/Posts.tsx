
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, UploadButton } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { User, UserPlus, Users, ThumbsUp, ImageUp, UploadIcon } from "lucide-react";
import { useDialog } from "@/components/common/DialogWrapper";
import { toast } from "sonner";
import PostCard from "./PostCard";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";

export interface Post {
  id: number;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  title: string;
  content: string;
  image: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Follower {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  isFollowing: boolean;
}

const Posts = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const { token, user } = context;
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([
    {
      id: 1,
      name: "Dr. James Wilson",
      role: "Endodontist",
      isFollowing: true
    },
    {
      id: 2,
      name: "Dr. Lisa Brown",
      role: "Oral Surgeon",
      isFollowing: false
    },
    {
      id: 3,
      name: "Dr. Robert Garcia",
      role: "General Dentist",
      isFollowing: true
    },
    {
      id: 4,
      name: "Dr. Jennifer Taylor",
      role: "Cosmetic Dentist",
      isFollowing: false
    },
    {
      id: 5,
      name: "Dr. David Kim",
      role: "Orthodontist",
      isFollowing: true
    }
  ]);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const { openDialog } = useDialog();

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleFollowToggle = (followerId: number) => {
    setFollowers(followers.map(follower => {
      if (follower.id === followerId) {
        return {
          ...follower,
          isFollowing: !follower.isFollowing
        };
      }
      return follower;
    }));

    const follower = followers.find(f => f.id === followerId);
    if (follower) {
      toast.success(`${follower.isFollowing ? 'Unfollowed' : 'Now following'} ${follower.name}`);
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    const newPost = {
      id: posts?.length + 10,
      author: {
        name: user?.firstname + ' ' + user?.lastname,
        role: user?.Permission,
        avatar: user?.imageUrl
      },
      title: title,
      content: content,
      image: image,
      date: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    await axios.post(`${apiUrl}/api/post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success("Post added successfully!");
      newPost.image = res.data; 
      setPosts([newPost, ...posts]);
      setContent("");
      setTitle("");
      setImage(null);
    }).catch(err => {
      toast.error("Post not added.");
      console.log(err);
    });

  };

  useEffect(() => {
    const fetchPosts = async () => {
      await axios.get(`${apiUrl}/api/post/all`)
      .then(res => {
        setPosts(res.data);
        console.log("Posts: ", res.data);
      }).catch(err => console.log(err));
    }
    fetchPosts();
  }, [apiUrl])

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="w-full lg:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Professional Network</h1>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    {user?.imageUrl ? <AvatarImage src={apiUrl + "/images/" + user.imageUrl} /> : <User className="h-6 w-6" />}
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Title..." className="mb-1" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <Textarea 
                      placeholder="Share updates, thoughts or research with your dental network..."
                      className="min-h-[100px] mb-3"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <UploadButton handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0])} variant="ghost" className="mr-1">
                        <ImageUp className="h-10" />
                      </UploadButton>
                      <Button onClick={handleCreatePost}>
                        <UploadIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Updates</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLikePost(post.id)} 
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="following">
                <Card className="mb-4 p-6 flex justify-center items-center flex-col">
                  <Users className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-muted-foreground">View updates from people you follow</p>
                  <Button variant="link" onClick={() => document.getElementById('followers-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    Manage Followers
                  </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="popular">
                <Card className="mb-4 p-6 flex justify-center items-center flex-col">
                  <ThumbsUp className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-muted-foreground">Most liked posts will appear here</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/4">
            <Card id="followers-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  <span>Dental Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Connect with other dental professionals</p>
                
                <div className="space-y-4">
                  {followers.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <User className="h-5 w-5" />
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{follower.name}</p>
                          <p className="text-xs text-muted-foreground">{follower.role}</p>
                        </div>
                      </div>
                      <Button 
                        variant={follower.isFollowing ? "outline" : "secondary"} 
                        size="sm"
                        className="gap-1"
                        onClick={() => handleFollowToggle(follower.id)}
                      >
                        {follower.isFollowing ? (
                          "Following"
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-center">View All Connections</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};



export default Posts;
