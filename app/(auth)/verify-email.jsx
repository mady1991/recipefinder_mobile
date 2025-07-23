import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { useSignUp } from '@clerk/clerk-expo';
import { authStyles } from '../../assets/styles/auth.styles';
import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';
import { useRouter } from 'expo-router';

const VerifyEmailScreen = ({ email, onBack }) => {

  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerification = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        Alert.alert("Error", "Verification faild. Please try again");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }

    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Verification failed");
      console.error(JSON.stringify(signUpAttempt, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={64}>
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={authStyles.imageContainer}>
            <Image source={require('../../assets/images/i3.png')}
              style={authStyles.image}
              contentFit="contain" />
          </View>

          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>{`We've sent verification code to ${email}`}</Text>


          <View style={authStyles.formContainer}>
            {/* CODE CONTAINER  */}
            <View style={authStyles.inputContainer}>
              <TextInput style={authStyles.textInput}
                placeholder='Enter verification code'
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType='email-address'
                autoCapitalize='none' />
            </View>

            {/* SIGN UP BUTTON  */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}>

              <Text style={authStyles.buttonText}>{loading ? 'Verifing...' : 'Verify'}</Text>

            </TouchableOpacity>


            {/* SIGN UP LINK */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.back()}>
              <Text style={authStyles.link}> Back to Sign Up</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  )
}

export default VerifyEmailScreen