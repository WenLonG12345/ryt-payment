import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useTransactionStore } from "@/lib/store/transaction";
import { useAuthStore } from "@/lib/store/auth";
import { ITransactionHistory } from "@/types/transaction";
import dayjs from "dayjs";

const TransactionHistory = () => {
  const currentUser = useAuthStore((state) => state.user);
  const getHistoryByUserId = useTransactionStore(
    (state) => state.getHistoryByUserId
  );
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );

  const history = getHistoryByUserId(currentUser?.id || "");

  const renderAmount = (history: ITransactionHistory) => {
    if (history.kind === "SEND") {
      return <Text style={styles.send}>- RM {history.amount.toFixed(2)}</Text>;
    }
    if (history.kind === "RECEIVE") {
      return (
        <Text style={styles.receive}>+ RM {history.amount.toFixed(2)}</Text>
      );
    }
    return <Text>RM {history.amount.toFixed(2)}</Text>;
  };

  const handleResend = (transaction: ITransactionHistory) => {
    // Implement your resend logic here
    Alert.alert(
      "Resend Transaction",
      `Are you sure you want to resend RM${transaction.amount.toFixed(
        2
      )} to the same recipient?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resend",
          onPress: () => {
            // Call your resend function from transaction store
            console.log("Resending transaction:", transaction);
            // Close the action after resending
            setSelectedTransaction(null);
          },
        },
      ]
    );
  };

  const toggleSelection = (id: string) => {
    if (selectedTransaction === id) {
      setSelectedTransaction(null);
    } else {
      setSelectedTransaction(id);
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.transactionList}>
        {Object.keys(history).length === 0 ? (
          <Text>No History at this moment</Text>
        ) : (
          history.map((h, index) => (
            <View key={h.id}>
              <TouchableOpacity
                onPress={() => toggleSelection(h.id)}
                style={[
                  styles.transaction,
                  index === history.length - 1 && styles.lastTransaction,
                ]}
              >
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{h.note || h.id}</Text>
                  <Text style={styles.transactionDate}>
                    {dayjs(h.createdAt).format("YYYY-MM-DD")}
                  </Text>
                </View>
                {renderAmount(h)}
              </TouchableOpacity>

              {selectedTransaction === h.id && h.kind === "SEND" && (
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={() => handleResend(h)}
                >
                  <Text style={styles.resendButtonText}>Resend</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  transactionList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastTransaction: {
    borderBottomWidth: 0,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  transactionDate: {
    color: "#888",
    fontSize: 14,
  },
  receive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2ECC71",
  },
  send: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E74C3C",
  },
  resendButton: {
    backgroundColor: "#6387f2",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  resendButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
