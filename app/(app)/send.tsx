import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ITransactionSendReq,
  TransactionSendSchema,
} from "@/types/transaction";
import SendScreen1 from "@/components/TransactionSend/SendScreen1";
import SendScreen2 from "@/components/TransactionSend/SendScreen2";
import { sendTransaction } from "@/lib/service/transaction";
import Toast from "react-native-toast-message";
import useLocalAuthentication from "@/hooks/useLocalAuthentication";
import { useTransactionStore } from "@/lib/store/transaction";
import { useAuthStore } from "@/lib/store/auth";

const SendTransactionScreen = () => {
  const router = useRouter();
  const { transactionId } = useLocalSearchParams();
  const { authenticate } = useLocalAuthentication();
  const currentUser = useAuthStore((state) => state.user);
  const getHistoryById = useTransactionStore((state) => state.getHistoryById);

  const form = useForm<ITransactionSendReq>({
    resolver: zodResolver(TransactionSendSchema),
  });

  const [step, setStep] = useState(1); // 1: Enter details, 2: Confirm
  const [isLoading, setIsLoading] = useState(false);

  const handleSendTransaction = async () => {
    setIsLoading(true);

    // Add a 2-second delay before proceeding
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      authenticate();

      await sendTransaction(form.getValues());

      Toast.show({
        type: "success",
        text1: "Transaction sent successfully",
      });

      router.replace("/(app)");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err?.message,
      });
      setIsLoading(false);
    }
  };

  const isValidForm = () => {
    if (step === 1) {
      const values = form.watch();
      const errors = form.formState.errors;
      const hasNoErrors = Object.keys(errors).length === 0;

      // Check if recipient and amount are filled in
      return (
        values.to &&
        values.amount &&
        !isNaN(Number(values.amount)) &&
        Number(values.amount) > 0 &&
        hasNoErrors
      );
    }
    return true;
  };

  const renderButton = () => {
    if (step === 1) {
      return (
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isValidForm() && styles.disabledButton,
          ]}
          onPress={() => setStep(2)}
          disabled={!isValidForm()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          {isValidForm() && (
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
          )}
        </TouchableOpacity>
      );
    }

    if (step === 2) {
      return (
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isValidForm() && styles.disabledButton,
          ]}
          onPress={form.handleSubmit(handleSendTransaction)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text style={styles.continueButtonText}>Confirm & Send</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
            </>
          )}
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    if (transactionId) {
      const history = getHistoryById(
        currentUser?.id || "",
        transactionId as string
      );
      if (history) {
        form.setValue("to", history.to);
        form.setValue("amount", history.amount.toString());
        form.setValue("note", history.note);
      }
    }
  }, [transactionId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (step === 2) setStep(1);
            else router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === 1 ? "Send Money" : "Confirm Payment"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 ? (
            <SendScreen1 form={form} />
          ) : (
            <SendScreen2 form={form} />
          )}
        </ScrollView>

        <View style={styles.footer}>{renderButton()}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5ea",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  noteWrapper: {
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  inputIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: "#333",
  },
  amountInput: {
    fontSize: 20,
    fontWeight: "600",
  },
  noteInput: {
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: "top",
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    borderTopWidth: 1,
    borderTopColor: "#e1e5ea",
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#a0aec0",
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 8,
  },
  confirmContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  confirmCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  confirmHeaderSection: {
    backgroundColor: "#f0f4ff",
    padding: 20,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 16,
    color: "#1e40af",
    fontWeight: "600",
    marginBottom: 10,
  },
  amountDisplayContainer: {
    marginVertical: 10,
  },
  amountDisplay: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1e40af",
  },
  confirmDetailsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5ea",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 15,
    color: "#666",
  },
  detailValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e40af",
  },
});
