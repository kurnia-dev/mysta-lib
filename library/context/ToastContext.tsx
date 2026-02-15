import { nanoid } from 'nanoid';
import { Toast as RUIToast } from 'radix-ui';
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Toast } from 'lib/components/toast/Toast';
import {
  ToastData,
  ToastProps,
  ToastProviderProps,
} from 'lib/components/toast/Toast.d';

const ToastContext = createContext<{
  showToast: (data: ToastData) => void;
} | null>(null);

const ToastItem = memo((props: ToastProps) => {
  const { action, icon, id, message, severity, onClose } = props;
  return (
    <Toast key={id} {...{ action, icon, id, message, severity, onClose }} />
  );
});

ToastItem.displayName = 'ToastItem';

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((removedId: string) => {
    setToasts((prev) => prev.filter((each) => each.id !== removedId));
  }, []);

  const showToast = useCallback(
    (data: ToastData) => {
      const id = nanoid(10);
      setToasts((prev) =>
        prev.concat({ ...data, id, onClose: () => removeToast(id) }),
      );
    },
    [removeToast],
  );

  const providedValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={providedValue}>
      <RUIToast.Provider swipeDirection="right">
        {children}
        {toasts.map(({ action, icon, id, message, severity, onClose }) => (
          <ToastItem
            {...{ action, icon, id, message, severity, onClose }}
            key={id}
          />
        ))}
        <RUIToast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      </RUIToast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
