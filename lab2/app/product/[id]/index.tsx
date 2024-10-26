import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/api/routes';
import { Product } from '@/types/Product';
import ActionButton from '@/components/ActionButton';
import { StyleSheet } from 'react-native';


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string, name: string }>();

  const { data: product } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productDescription}>Opis produktu:</Text>
          <Text style={styles.productDescription}>{product?.description}</Text>
          <View style={styles.priceQuantityContainer}>
            <Text>Cena: {product?.price} zł</Text>
            <Text>Liczba produktów: {product?.quantity}</Text>
          </View>
        </View>
        <ActionButton isEdit={true} params={{ id }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    gap: 5,
    padding: 10,
  },
  productName: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 20,
    color: '#6c757d',
    marginVertical: 10,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    padding: 10,
  },
});