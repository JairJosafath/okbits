import { API } from "@/app/api/axios";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  function useSignIn({
    username,
    password,
  }: {
    password: string;
    username: string;
  }) {
    return useQuery({
      queryKey: ["signIn"],
      queryFn: () => API.auth.signin({ password, username }),
    });
  }

  function useSignUp({
    username,
    password,
  }: {
    password: string;
    username: string;
  }) {
    return useQuery({
      queryKey: ["signUp"],
      queryFn: () => API.auth.signup({ password, username }),
      retry: 1,
    });
  }
  return {
    useSignIn,
    useSignUp,
  };
}
