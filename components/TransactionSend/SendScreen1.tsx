import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Controller, UseFormReturn } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { useAuthStore } from "@/lib/store/auth";
import { MOCK_USER_LIST } from "@/lib/constants/user";
import { ITransactionSendReq } from "@/types/transaction";

interface ISendScreen1 {
  form: UseFormReturn<ITransactionSendReq>;
}

const SendScreen1 = ({ form }: ISendScreen1) => {
  const currentUser = useAuthStore((state) => state.user);
  const receipientList = MOCK_USER_LIST.filter((u) => u.id !== currentUser?.id).map(
    (user) => ({
      key: user.id,
      label: user?.fullName || "",
      value: user.id,
    })
  );

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Recipient</Text>
        <Controller
          name="to"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              items={receipientList}
              onValueChange={(itemValue) => {
                onChange(itemValue);
              }}
              value={value}
              style={{
                inputIOS: styles.selectWrapper,
                inputAndroidContainer: styles.selectWrapper,
                placeholder: {
                  color: "#999",
                },
              }}
              placeholder={{ label: "Select a recipient", value: null }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
              )}
            />
          )}
        />
      </View>

      <Controller
        name="amount"
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="cash-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.amountInput]}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={value ? value.toString() : ""}
                onChangeText={onChange}
              />
            </View>
          </View>
        )}
      />

      <Controller
        name="note"
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Note (Optional)</Text>
            <View style={[styles.inputWrapper]}>
              <Ionicons
                name="create-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.noteInput]}
                placeholder="What's this for?"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={value}
                onChangeText={onChange}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SendScreen1;

const styles = StyleSheet.create({
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
  selectWrapper: {
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
    paddingHorizontal: 8,
    fontWeight: 600,
    fontSize: 16,
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
});
