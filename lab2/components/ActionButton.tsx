import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { View } from "./Themed";
import { Ionicons } from "@expo/vector-icons";

type ActionButtonProps = {
  isEdit?: boolean,
  params?: { id: string },
};

export default function ActionButton({ isEdit = false, params }: ActionButtonProps) {

  return (
    <Link
      asChild
      href={{
        pathname: '/modal',
        params: {
          title: isEdit ? 'Edit product' : 'Create product',
          id: params?.id ?? '',
        },
      }}
    >
      <Pressable>
        <View style={{ ...styles.addButton, backgroundColor: isEdit ? 'orange' : 'green' }}>
          {isEdit && <Ionicons name="pencil" size={24} color="white" />}
          {!isEdit && <Ionicons name="add" size={24} color="white" />}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 15,
    backgroundColor: 'green',
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  icon: {
    fontSize: 25,
  }
});