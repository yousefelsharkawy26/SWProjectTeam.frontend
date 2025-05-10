import UserProvider from '@/context/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, UploadButton } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Upload } from 'lucide-react'

const PersonalInfo = () => {
  const userContext = UserProvider.useUser();
  const [user, setUser] = useState(userContext.user);
  const [updated, setUpdated] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setUser(userContext.user);
  }, [userContext])

  const handleUpdate = async () => {
    const formData = {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      phone: user.phone,
      permission: user.permission,
      imageUrl: user.imageUrl,
      bio: user.bio,
    };

    const res = await axios.post(`${apiUrl}/api/updateuser`, formData, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
          'Accept': 'application/json'
        }
      }).then(() => {
        toast.success("Data updated successfully.")
        setUpdated(false);
      })
      .catch(() => toast.error("Data faild to update."));
  }
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append('file', file);

    if (file) {
      await axios.post(`${apiUrl}/api/Users/changeImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data;',
          Authorization: `Bearer ${userContext.token}`,
        },
      }).then(() => {
        userContext.setUserChanged(!userContext.userChanged);
      }).catch(err => {
        toast.error("Image faild to chane, try again letter.");
      })
    }
  }

  const handleRemove = async () => {
    if (!user.imageUrl) return;

    await axios.delete(`${apiUrl}/api/users/remove-user-image?name=${user.imageUrl}`, {
      headers: {
        Authorization: `Bearer ${userContext.token}`,
        'Accept': 'application/json'
      }
    }).then(res => {
      console.log(res);
      userContext.setUserChanged(!userContext.userChanged);
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <Card>
    <CardHeader>
      <div className='flex relative'>
        <div>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal information and preferences.
          </CardDescription>
        </div>
        <Button disabled={!updated} onClick={handleUpdate} className='w-32 absolute right-2'>Save Changes</Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.imageUrl? apiUrl + '/images/' + user?.imageUrl : "/placeholder.svg"} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Profile picture</p>
            <p className="text-sm text-gray-500">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="flex gap-4">
            <UploadButton className="mr-2" handleChange={handleChange}>
              <Upload /> Upload
            </UploadButton>
            <Button size="sm" variant="ghost" onClick={handleRemove}>Remove</Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" 
                defaultValue={user?.firstname} 
                onChange={(e) => {
                  setUser({...user, firstname: e.target.value});
                  setUpdated(true);
                  }} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" 
                defaultValue={user?.lastname}
                onChange={(e) => {
                  setUser({...user, lastname: e.target.value});
                  setUpdated(true);
                  }} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" 
                type="email" 
                defaultValue={user?.email}
                onChange={(e) => {
                  setUser({...user, email: e.target.value});
                  setUpdated(true);
                  }} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" 
                placeholder="(555) 123-4567" 
                defaultValue={user?.phone}
                onChange={(e) => {
                  setUser({...user, phone: e.target.value});
                  setUpdated(true);
                  }} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us about yourself" 
            defaultValue={user?.bio}
            rows={4}
            onChange={(e) => {
              setUser({...user, bio: e.target.value});
              setUpdated(true);
              }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default PersonalInfo