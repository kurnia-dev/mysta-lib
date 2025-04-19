import { createContext, useContext, useMemo, ReactNode } from 'react';

// Define the shape of your config options
interface ConfigOptions {
  preset: Record<string, any>; // Replace `any` with your actual preset type
  locale?: Record<string, any>; // Or more specific type if known
}

// Define the context value shape
interface MystaLibContextType {
  preset: ConfigOptions['preset'];
  locale?: ConfigOptions['locale'];
}

// Create the context
const MystaLibContext = createContext<MystaLibContextType | null>(null);

// Provider props type
interface MystaLibProviderProps {
  configOptions: ConfigOptions;
  children: ReactNode;
}

// Custom Provider
export const MystaLibProvider = ({
  configOptions,
  children,
}: MystaLibProviderProps) => {
  const MystaLib = useMemo<MystaLibContextType>(
    () => ({
      preset: configOptions.preset,
      locale: configOptions.locale,
    }),
    [configOptions.preset, configOptions.locale],
  );

  return (
    <MystaLibContext.Provider value={MystaLib}>
      {children}
    </MystaLibContext.Provider>
  );
};

// Hook to consume the context
export const useMystaLib = (): MystaLibContextType => {
  const context = useContext(MystaLibContext);
  if (!context) {
    throw new Error('useMystaLib must be used within a MystaLibProvider');
  }
  return context;
};
