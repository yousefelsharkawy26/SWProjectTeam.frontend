import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Share2, User } from "lucide-react";
import { Post } from "./Posts";
import { formatDuration, Interval, interval, intervalToDuration } from "date-fns";

interface PostCardProps {
    post: Post;
    onLike: () => void;
  }

const PostCard = ({ post, onLike }: PostCardProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const myInterval: Interval<Date> = interval(post?.date ? post?.date : new Date(), new Date());
  const duration = intervalToDuration(myInterval);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              {post?.author?.avatar ? (
                <img src={apiUrl + '/images/' + post?.author?.avatar} alt={post?.author?.name} />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{post?.author?.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal">
                  {post?.author?.role}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {
          post?.title && <h1 className="text-2xl font-bold mb-1 text-dental-blue">{post?.title}</h1>
        }
        <p className="whitespace-pre-wrap">{post?.content}</p>
        <div className="m-2 h-72 w-full overflow-hidden flex justify-center">
          <img className="image-strech" src={apiUrl + '/images/' + post?.image}/>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${post?.isLiked ? "text-dental-blue" : ""}`}
            onClick={onLike}
          >
            <Heart
              className={`h-4 w-4 ${post?.isLiked ? "fill-current" : ""}`}
            />
            {post?.likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            {post?.comments}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
