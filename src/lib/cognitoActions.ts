import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
  updateUserAttribute,
  type UpdateUserAttributeOutput,
  confirmUserAttribute,
  updatePassword,
  resetPassword,
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
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    if (isSignUpComplete) {
      await autoSignIn();
      return { success: true };
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

export async function handleUpdateUserAttribute(
  prevState: string,
  formData: FormData
) {
  let attributeKey = 'name';
  let attributeValue;
  let currentAttributeValue;

  if (formData.get('email')) {
    attributeKey = 'email';
    attributeValue = formData.get('email');
    currentAttributeValue = formData.get('current_email');
  } else {
    attributeValue = formData.get('name');
    currentAttributeValue = formData.get('current_name');
  }

  if (attributeValue === currentAttributeValue) {
    return '';
  }

  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey: String(attributeKey),
        value: String(attributeValue),
      },
    });
    return handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case 'CONFIRM_ATTRIBUTE_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      return `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`;
    case 'DONE':
      return 'success';
  }
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

export async function handleConfirmUserAttribute(
  prevState: 'success' | 'error' | undefined,
  formData: FormData
) {
  const code = formData.get('code');

  if (!code) {
    return;
  }

  try {
    await confirmUserAttribute({
      userAttributeKey: 'email',
      confirmationCode: String(code),
    });
  } catch (error) {
    console.log(error);
    return 'error';
  }

  return 'success';
}

export async function handleResetPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await resetPassword({ username: String(formData.get('email')) });
  } catch (error) {
    return getErrorMessage(error);
  }
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
