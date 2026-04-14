'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetUserSB } from "../../hooks/useGetUserSB";

export const ProfileForm = () => {
  const res = useGetUserSB();
  const email = res.session?.user.email;
  const avatarUrl = res.session?.user.user_metadata.avatar_url as string | undefined;
  const userFullName = res.session?.user.user_metadata.full_name as string | undefined;

  return (
    <div>
      <div className="flex items-center gap-5 justify-center m-10">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-blue-950 text-white">AVATAR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Email:</h3>
          <p className="text-sm">{email}</p>
          <h3 className="font-bold">Full Name:</h3>
          <p className="text-sm">{userFullName ? userFullName : 'NA'}</p>
        </div>
      </div>
    </div>
  );
};
