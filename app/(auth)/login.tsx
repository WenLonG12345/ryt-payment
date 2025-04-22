import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ILoginReq, LoginSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_USER_LIST } from "@/lib/constants/user";

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<ILoginReq>({
    resolver: zodResolver(LoginSchema),
  });

  const setUser = useAuthStore((state) => state.setUser);


  const handleLogin = async (data: ILoginReq) => {
    // Mock User Login
    const user = MOCK_USER_LIST.find((user) => user.username === data.username);

    if (!user) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "User not found",
      });
      return;
    }

    if (user.password !== data.password) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Incorrect password",
      });
      return;
    }

    setUser(user);
    router.replace("/(app)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue to your account
            </Text>

            <Controller
              name="username"
              control={form.control}
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#999"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
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
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {formState.errors.password && (
                    <Text style={styles.inputError}>
                      {formState.errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={form.handleSubmit(handleLogin)}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* <View style={styles.footerText}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e40af",
  },
  formContainer: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 2,
    backgroundColor: "#f9fafb",
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 6,
    paddingLeft: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#1e40af",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#1e3a8a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  noAccountText: {
    fontSize: 14,
    color: "#666",
  },
  registerText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
});
