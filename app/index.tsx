import { useAuthStore } from "@/lib/store/auth";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

const HomeScreen = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return <Slot />;
};

export default HomeScreen;
