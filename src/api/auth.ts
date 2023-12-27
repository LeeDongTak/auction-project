import { supabase } from "../supabase";

type Inputs = {
  email: string;
  password: string;
  address?: string;
};

const signUp = async ({ email, password }: Inputs) => {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
};

export { signUp };
