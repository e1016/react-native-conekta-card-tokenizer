package com.conektacardtokenizer;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

import org.json.JSONObject;

import io.conekta.conektasdk.Card;
import io.conekta.conektasdk.Conekta;
import io.conekta.conektasdk.Token;

@ReactModule(name = ConektaCardTokenizerModule.NAME)
public class ConektaCardTokenizerModule extends ReactContextBaseJavaModule {
  Boolean isCollected = false;
  public static final String NAME = "ConektaCardTokenizer";

  public ConektaCardTokenizerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void getCardToken(ReadableMap info, final Callback successCallback, final Callback failureCallback) {

    String publicKey = info.getString("publicKey");

    Conekta.setPublicKey(publicKey);

    if (isCollected) {
      isCollected = true;
      Conekta.collectDevice(getCurrentActivity());
    }

    String cardNumber = info.getString("cardNumber");
    String name = info.getString("name");
    String cvc = info.getString("cvc");
    String expMonth = info.getString("expMonth");
    String expYear = info.getString("expYear");

    Card card = new Card(name, cardNumber, cvc, expMonth, expYear);
    Token token = new Token(getCurrentActivity());

    token.onCreateTokenListener( new Token.CreateToken(){
      @Override
      public void onCreateTokenReady(JSONObject data) {
        try {
          successCallback.invoke(data.toString());
        } catch (Exception err) {
          failureCallback.invoke(err.getMessage());
        }
      }
    });

    token.create(card);
  }
}
