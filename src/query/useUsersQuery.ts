import { useMutation } from "@tanstack/react-query";
import { addUser, updateUser } from "../api/auth";

export const useUserAddMutation = () => useMutation({ mutationFn: addUser });

export const useUserUpdateMutation = () =>
  useMutation({ mutationFn: updateUser });
