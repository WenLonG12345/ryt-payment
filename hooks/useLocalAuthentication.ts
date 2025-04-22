import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

type AuthenticationTypes = {
  fingerprint: boolean;
  facialRecognition: boolean;
  iris: boolean;
};

interface UseLocalAuthenticationReturn {
  isLoading: boolean;
  supportedBiometrics: AuthenticationTypes;
  isBiometricSupported: boolean;
  authenticate: () => Promise<boolean>;
  hasHardware: boolean;
  isEnrolled: boolean;
}

export const useLocalAuthentication = (): UseLocalAuthenticationReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasHardware, setHasHardware] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [supportedBiometrics, setSupportedBiometrics] = useState<AuthenticationTypes>({
    fingerprint: false,
    facialRecognition: false,
    iris: false,
  });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        
        // Check if hardware supports biometrics
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setHasHardware(compatible);
        
        if (compatible) {
          // Check if biometrics are enrolled
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          setIsEnrolled(enrolled);
          
          // Get available biometric types
          const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
          
          setSupportedBiometrics({
            fingerprint: types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT),
            facialRecognition: types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION),
            iris: types.includes(LocalAuthentication.AuthenticationType.IRIS),
          });
        }
      } catch (error) {
        console.error('Error checking biometric support:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const authenticate = async (): Promise<boolean> => {
    try {
      // Check if device has biometric hardware
      if (!hasHardware) {
        console.log('This device does not support biometric authentication');
        return false;
      }

      // // Check if user has enrolled in biometrics
      // if (!isEnrolled) {
      //   console.log('No biometrics enrolled on this device');
      //   return false;
      // }

      // Perform authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to proceed',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      console.log('Authentication result:', result);

      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  const isBiometricSupported = hasHardware && isEnrolled;

  return {
    isLoading,
    supportedBiometrics,
    isBiometricSupported,
    authenticate,
    hasHardware,
    isEnrolled,
  };
};

export default useLocalAuthentication;