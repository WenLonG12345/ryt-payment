import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/lib/store/auth";

const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default DashboardLayout;
