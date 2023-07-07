# react-native-conekta-card-tokenizer

Easy bridge for get a card token using native conekta sdk Android and iOS based on [@zo0r/react-native-conekta](https://github.com/zo0r/react-native-conekta) repo but using most recent React Native.

## Installation

```sh
npm i -s react-native-conekta-card-tokenizer
```

## Usage

```js
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// imports...
import getCardToken, {
  type ConektaCardToken, // optional
  type ConektaCard, // optional
} from 'react-native-conekta-card-tokenizer';

export default function App() {
  const [cardToken, setCardToken] = useState<string>('');

  const createToken = async () => {

    // this is the required data
    const data: ConektaCard = {
      name: 'John Doe',
      cardNumber: '4242424242424242',
      cvc: '123',
      expMonth: '01',
      expYear: '2024',
      publicKey: 'REPALCE_WITH_YOUR_PUBLIC_KEY',
    };

    const result: ConektaCardToken = await getCardToken(data);

    setCardToken(result.id); // id contains the token
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
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
