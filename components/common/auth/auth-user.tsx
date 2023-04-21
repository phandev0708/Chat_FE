// import { BoxChatComponent } from '@/components/common/box-chat';
import { useAuth } from "@/hooks/index";
// import { setCurrentUserOnline } from '@/redux/index';
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export interface AuthUserProps {
  children: any;
}

export function AuthUser({ children }: AuthUserProps) {
  // const router = useRouter();
  // const { profile, firstLoading } = useAuth();

  // const convertProfileType: any = profile;
  // const userID = convertProfileType?.data?.ID;
  // const isActive = convertProfileType?.data?.IsActive;
  // const isAccept = convertProfileType?.data?.IsAccept;
  // const userEmail = convertProfileType?.data?.Email;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     if (!firstLoading && !userID) {
  //         localStorage.removeItem('isLogin');
  //         localStorage.setItem('isLogin', '0');

  //         router.push('/');
  //     }
  //     if (isActive === false) {
  //         localStorage.removeItem('isLogin');
  //         localStorage.setItem('isLogin', '0');
  //         router.push(`/verify?userId=${userID}&email=${userEmail}`);
  //     }
  //     if (isAccept === false) {
  //         localStorage.removeItem('isLogin');
  //         localStorage.setItem('isLogin', '0');
  //         router.push(`/accept`);
  //     }
  //     // if (userID) {
  //     //     const action = setCurrentUserOnline({ id: userID });
  //     //     dispatch(action);
  //     // }
  // }, [router, profile, firstLoading, userID, isActive, isAccept, userEmail]);

  // if (!userID) {
  //     return <></>;
  // }

  // if (!isActive) {
  //     return <></>;
  // }

  // if (!isAccept) {
  //     return <></>;
  // }

  return <Stack>{children}</Stack>;
}
