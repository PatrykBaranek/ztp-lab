import React from "react";
import ActionButton from "@/components/ActionButton";
import { Text, View } from "@/components/Themed";
import { Product } from "@/types/Product";
import { fetchProductList } from "@/api/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import productsMocks from "@/mock/products.json";
import { deleteProduct } from "@/api/routes";
import { FontAwesome } from "@expo/vector-icons";


export default function ProductsScreen() {
  const { data: products, refetch } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProductList,
    placeholderData: productsMocks,
  });

  const { mutate } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: deleteProduct,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const lastUpdated = React.useCallback((product: Product) => {
    const lastUpdateFound = product?.changelogs?.findLast((changeLog) => changeLog)?.timestamp;
    const formatted = new Date(lastUpdateFound ?? 0);
    return formatted.toLocaleString();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          style={styles.listContainer}
          refreshing={false}
          onRefresh={refetch}
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Link
              key={item.id}
              asChild
              href={{
                pathname: "/product/[id]",
                params: {
                  id: item.id,
                  name: item.name,
                },
              }}
            >
              <TouchableHighlight underlayColor="transparent">
                <View style={styles.productContainer}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.price}</Text>
                  <Text>{item.quantity}</Text>
                  {item?.changelogs.length > 0 && <Text>Last updated {lastUpdated(item)}</Text>}
                  <TouchableOpacity style={styles.deleteButton} onPress={() => mutate(item.id)}>
                    <FontAwesome name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableHighlight>
            </Link>
          )}
        />
        <ActionButton />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
  },
  productContainer: {
    position: 'relative',
    height: 200,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
})