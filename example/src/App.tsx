import React, { useState } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import getCardToken, {
  type ConektaCardToken,
  type ConektaCard,
} from 'react-native-conekta-card-tokenizer';

export default function App() {
  const [cardToken, setCardToken] = useState<string>('');

  const createToken = async () => {
    const data: ConektaCard = {
      name: 'John Doe',
      cardNumber: '4242424242424242',
      cvc: '123',
      expMonth: '01',
      expYear: '2024',
      publicKey: 'REPALCE_WITH_YOUR_PUBLIC_KEY',
    };

    const result: ConektaCardToken = await getCardToken(data);
    console.log('result', result);
    setCardToken(result.id);
  };

  return (
    <View style={styles.container}>
      <Button title="Create Token" onPress={createToken} />
      <Text style={styles.text}>Token: {cardToken || 'wait...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
