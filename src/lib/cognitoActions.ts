import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
  updatePassword,
  confirmResetPassword,
} from 'aws-amplify/auth';
import { getErrorMessage } from '@/src/utils/get-error-message';

import { z } from 'zod';
import {
  reSendCodeSchema,
  signInSchema,
  signUpSchema,
  verificationSchema,
} from '../schemas/auth';

type SignUpFormData = z.infer<typeof signUpSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
type ResendCodeData = z.infer<typeof reSendCodeSchema>;
type SignInData = z.infer<typeof signInSchema>;

export async function handleSignUp(formData: SignUpFormData) {
  try {
    const validatedData = signUpSchema.safeParse(formData);
    if (!validatedData.success) {
      throw new Error('Validation failed');
    }

    const { name, surname, email, password } = validatedData.data;

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email,
          name: name,
          family_name: surname,
        },
        // optional autoSignIn if needed
        autoSignIn: true,
      },
    });

    return { success: true };
  } catch (error) {
    // Handle errors and return an error object
    const messageError = getErrorMessage(error);
    if (messageError.includes('User already exists')) {
      return { exists: true };
    }
    return getErrorMessage(error);
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: ResendCodeData
) {
  const validatedData = reSendCodeSchema.safeParse(formData);

  if (!validatedData.success) {
    throw new Error('Validation failed');
  }

  const { email } = validatedData.data;
  let currentState;
  try {
    await resendSignUpCode({
      username: email,
    });
    currentState = {
      ...prevState,
      message: 'Code sent successfully',
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(formData: VerificationFormData) {
  const validatedData = verificationSchema.safeParse(formData);
  if (!validatedData.success) {
    throw new Error('Validation failed');
  }

  const { email, code } = validatedData.data;
  try {
    const response = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    if (response.isSignUpComplete) {
      await autoSignIn();
      return { success: true };
    } else {
      return response;
    }
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignIn(formData: SignInData) {
  const validatedData = signInSchema.safeParse(formData);

  if (!validatedData.success) {
    throw new Error('Validation failed');
  }
  const { email, password } = validatedData.data;

  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password: password,
    });
    if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      await resendSignUpCode({
        username: email,
      });
      return { verify: true };
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  return { success: true };
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  return { success: true };
}

export async function handleUpdatePassword(
  prevState: 'success' | 'error' | undefined,
  formData: FormData
) {
  const currentPassword = formData.get('current_password');
  const newPassword = formData.get('new_password');

  if (currentPassword === newPassword) {
    return;
  }

  try {
    await updatePassword({
      oldPassword: String(currentPassword),
      newPassword: String(newPassword),
    });
  } catch (error) {
    console.log(error);
    return 'error';
  }

  return 'success';
}

export async function handleConfirmResetPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await confirmResetPassword({
      username: String(formData.get('email')),
      confirmationCode: String(formData.get('code')),
      newPassword: String(formData.get('password')),
    });
  } catch (error) {
    return getErrorMessage(error);
  }
}
