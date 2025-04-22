import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownMenu, { MenuOption } from "@/components/DropdownMenu";

const DashboardScreen = () => {
  const [userMenu, setUserMenu] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{`Welcome Back, ${user?.username}`}</Text>
        <DropdownMenu
          visible={userMenu}
          handleOpen={() => setUserMenu(true)}
          handleClose={() => setUserMenu(false)}
          trigger={
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          }
          menuStyles={{
            marginTop: -10,
          }}
        >
          <MenuOption onSelect={() => logout()}>
            <Text>Logout</Text>
          </MenuOption>
        </DropdownMenu>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${user?.balance?.toFixed(2)}</Text>
        <View style={styles.actionButtons}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Send</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Request</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Top Up</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.transactionList}>
        <View style={styles.transaction}>
          <View style={styles.transactionIcon}>
            <Text style={styles.transactionIconText}>🛒</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Shopping</Text>
            <Text style={styles.transactionDate}>Today</Text>
          </View>
          <Text style={styles.transactionAmount}>-$45.00</Text>
        </View>
        <View style={styles.transaction}>
          <View style={styles.transactionIcon}>
            <Text style={styles.transactionIconText}>💰</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Salary</Text>
            <Text style={styles.transactionDate}>Yesterday</Text>
          </View>
          <Text style={[styles.transactionAmount, styles.income]}>
            +$2,500.00
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4C66EE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  balanceCard: {
    backgroundColor: "#4C66EE",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 12,
    width: "30%",
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
  },
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
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E74C3C",
  },
  income: {
    color: "#2ECC71",
  },
});
