import React, { useEffect, useState } from 'react';
import DocTitle from '../DocTitle';
import { Button, Dialog, RadioButton, ToggleSwitch } from 'lib/components';
import { DialogProps } from 'lib/components/dialog/Dialog.d';

const DialogDocs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(false);
  const [closeOnBlur, setCloseOnBlur] = useState(false);
  const [useCloseIcon, setUseCloseIcon] = useState(true);
  const [modal, setModal] = useState(true);
  const [size, setSize] = useState<DialogProps['size']>('sm');

  useEffect(() => {
    console.log('DialogDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="Dialog" />

      <Button label="Open Dialog" onClick={() => setVisible(true)} />

      <Dialog
        visible={visible}
        onVisibleChange={setVisible}
        header="Ini Dialog Header"
        {...{ closeOnEscape, closeOnBlur, useCloseIcon, modal, size }}
      >
        <div className="flex flex-col gap-1">
          <span>ini dialog</span>
          <span>ngetes content</span>

          <div className="flex flex-col gap-1">
            <span>Dialog Width</span>
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="xs"
              optionValue="xs"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="sm"
              optionValue="sm"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="md"
              optionValue="md"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="lg"
              optionValue="lg"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="xl"
              optionValue="xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="2xl"
              optionValue="2xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="3xl"
              optionValue="3xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="4xl"
              optionValue="4xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="5xl"
              optionValue="5xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="6xl"
              optionValue="6xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="7xl"
              optionValue="7xl"
              value={size}
            />
            <RadioButton
              onChange={(e) => setSize(e as DialogProps['size'])}
              fieldName="size"
              label="full"
              optionValue="full"
              value={size}
            />
          </div>

          <ToggleSwitch
            onChange={(e) => {
              setModal(Boolean(e));
            }}
            label="Use Modal"
            value={modal}
          />
          <ToggleSwitch
            onChange={(e) => {
              setCloseOnBlur(Boolean(e));
            }}
            label="Close On Blur"
            value={closeOnBlur}
          />
          <ToggleSwitch
            onChange={(e) => {
              setCloseOnEscape(Boolean(e));
            }}
            label="Close On Escape"
            value={closeOnEscape}
          />
          <ToggleSwitch
            onChange={(e) => {
              setUseCloseIcon(Boolean(e));
            }}
            label="Use Close Icon"
            value={useCloseIcon}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DialogDocs;
