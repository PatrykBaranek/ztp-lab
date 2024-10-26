import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Product } from '@/types/Product';
import { createProduct, fetchProduct, updateProduct } from '@/api/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const REQUIRED_MESSAGE = 'Required field';

type Params = {
  title: string,
  id: string,
};

export default function ModalScreen() {
  const { id, title } = useLocalSearchParams<Params>();
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const isEdditing = id !== '';

  const { mutate: create, isPending: isCreatePending } = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigation.goBack();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { mutate: update, isPending: isUpdatePending } = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: (data: Partial<Product>) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
      navigation.goBack();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { control, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: async () => {
      if (isEdditing) {
        const data = await fetchProduct(id);
        return data;
      }

      return {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      };
    },
  });

  function onSubmit(data: Product) {
    if (isEdditing) {
      const updateData: Partial<Product> = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity
      };

      update(updateData);
    } else {
      create(data);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={Boolean(errors.name)}
          />
        )}
      />
      {errors.name && <ErrorMessage message={REQUIRED_MESSAGE} />}
      
      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={Boolean(errors.description)}
          />
        )}
      />
      {errors.description && <ErrorMessage message={REQUIRED_MESSAGE} />}
      
      <Controller
        control={control}
        name="price"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Price"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value ? value.toString() : ''}
            keyboardType="numeric"
            error={Boolean(errors.price)}
          />
        )}
      />
      {errors.price && <ErrorMessage message={REQUIRED_MESSAGE} />}
      
      <Controller
        control={control}
        name="quantity"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Quantity"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value ? value.toString() : ''}
            keyboardType="numeric"
            error={Boolean(errors.quantity)}
          />
        )}
      />
      {errors.quantity && <ErrorMessage message={REQUIRED_MESSAGE} />}
      
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={isCreatePending || isUpdatePending}
      >
        Submit
      </Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <Text style={styles.errorMessage}>{message}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 50,
    padding: 10,
  },
  input: {
    height: 50,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  errorMessage: {
    color: 'red',
  }
});