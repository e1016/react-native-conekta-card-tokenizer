import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-conekta-card-tokenizer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ConektaCardTokenizer = NativeModules.ConektaCardTokenizer
  ? NativeModules.ConektaCardTokenizer
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export interface ConektaCard {
  publicKey: string;
  cardNumber: string;
  cvc: string;
  name: string;
  expMonth: string;
  expYear: string;
}

export interface ConektaCardToken {
  id: string;
  livemode: boolean;
  object: 'token';
  used: boolean;
}

export default function getCardToken(
  card: ConektaCard
): Promise<ConektaCardToken> {
  return new Promise((resolve, reject) => {
    ConektaCardTokenizer.getCardToken(
      card,
      (result: ConektaCardToken | string) => {
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        // @ts-ignore
        resolve(result);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
}
