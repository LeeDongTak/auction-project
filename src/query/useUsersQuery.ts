import { useMutation } from "@tanstack/react-query";
import { addSocialUser, addUser, updateUser } from "../api/auth";

export const useUserAddMutation = () => useMutation({ mutationFn: addUser });

export const useSocialUserAddMutation = () =>
  useMutation({ mutationFn: addSocialUser });

export const useUserUpdateMutation = () =>
  useMutation({ mutationFn: updateUser });
