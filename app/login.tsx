import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ILoginReq, LoginSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { MOCK_USER, useAuthStore } from "@/lib/store/auth";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const form = useForm<ILoginReq>({
    resolver: zodResolver(LoginSchema),
  });

  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (data: ILoginReq) => {
    // Mock User Login
    if (
      data.username !== MOCK_USER.username &&
      data.password !== MOCK_USER.password
    ) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Incorrect username or password",
      });
      return;
    }

    setUser(MOCK_USER);

    router.replace("/dashboard");

    Toast.show({
      type: "success",
      text1: "Login successful",
      text2: `Welcome back, ${data.username}!`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <Controller
        name="username"
        control={form.control}
        render={({ field: { onChange, onBlur, value }, formState }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {formState.errors.username && (
              <Text style={styles.inputError}>
                {formState.errors.username.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field: { onChange, onBlur, value }, formState }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {formState.errors.password && (
              <Text style={styles.inputError}>
                {formState.errors.password.message}
              </Text>
            )}
          </View>
        )}
      />
      <Button title="Login" onPress={form.handleSubmit(handleLogin)} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  inputError: {
    fontSize: 12,
    color: "red",
  },
});
