import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITransactionSendReq } from "@/types/transaction";
import { MOCK_USER_LIST } from "@/lib/constants/user";

interface ISendScreen1 {
  form: UseFormReturn<ITransactionSendReq>;
}

const SendScreen2 = ({ form }: ISendScreen1) => {
  const formatCurrency = (value: string) => {
    if (!value) return "";
    return `RM ${parseFloat(value).toFixed(2)}`;
  };

  const amount = formatCurrency(form.getValues("amount").toString());
  const note = form.getValues("note") || "";
  const recipient = MOCK_USER_LIST.find(
    (user) => user.id === form.getValues("to")
  );

  return (
    <View style={styles.confirmContainer}>
      <View style={styles.confirmCard}>
        <View style={styles.confirmHeaderSection}>
          <Text style={styles.confirmTitle}>Transfer Details</Text>
          <View style={styles.amountDisplayContainer}>
            <Text style={styles.amountDisplay}>{amount}</Text>
          </View>
        </View>

        <View style={styles.confirmDetailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>To</Text>
            <Text style={styles.detailValue}>{recipient?.fullName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>{amount}</Text>
          </View>

          {note.trim() !== "" && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Note</Text>
              <Text style={styles.detailValue}>{note}</Text>
            </View>
          )}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default SendScreen2;

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    paddingBottom: 16,
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
