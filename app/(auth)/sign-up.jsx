import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { authStyles } from '../../assets/styles/auth.styles';
import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { isValidEmail } from '../utils/utility';
import VerifyEmailScreen from './verify-email';


const SignUpScreen = () => {

  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [pendingVerification, setpendingVerification] = useState(false);


  const handleSignUp = async () => {
    if (!email || !password) return Alert.alert("Error", "Please fill required fields");
    if (!isValidEmail(email)) return Alert.alert("Error", "Please enter vaild email id");
    if (password.length < 8) return Alert.alert("Error", "Password must be at least 8 characters");
    if (!isLoaded) return;
    setloading(true);

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setpendingVerification(true);
    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Sign up failed. Please try again.");
      console.error(JSON.stringify(error, null, 2));

    } finally {
      setloading(false);
    }

  };

  if (pendingVerification)
    return <VerifyEmailScreen
      email={email}
      onBack={() => setpendingVerification(false)} />;

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
            <Image source={require('../../assets/images/i2.png')}
              style={authStyles.image}
              contentFit="contain" />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          {/* FORM CONTAINER  */}
          <View style={authStyles.formContainer}>
            {/* EMAIL CONTAINER  */}
            <View style={authStyles.inputContainer}>
              <TextInput style={authStyles.textInput}
                placeholder='Enter email'
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none' />
            </View>


            {/* PASSWORD CONTAINER  */}
            <View style={authStyles.inputContainer}>

              <TextInput style={authStyles.textInput}
                placeholder='Enter password'
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setpassword}
                secureTextEntry={!showpassword}
                autoCapitalize='none' />

              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setshowpassword(!showpassword)}>

                <Ionicons
                  name={showpassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.textLight} />

              </TouchableOpacity>
            </View>

            {/* SIGN UP BUTTON  */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.8}>

              <Text style={authStyles.buttonText}>{loading ? 'Creating account...' : 'Sign up'}</Text>

            </TouchableOpacity>


            {/* SIGN IN LINK */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.back()}>
              <Text style={authStyles.linkText}>Don&apos;t have an account? <Text style={authStyles.link}>Sign In</Text></Text>
            </TouchableOpacity>
          </View>



        </ScrollView>

      </KeyboardAvoidingView>

    </View>
  );
}

export default SignUpScreen