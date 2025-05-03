import React, { useEffect, useState } from 'react';

import { Button, Dialog, RadioButton, ToggleSwitch } from 'lib/components';
import { DialogProps } from 'lib/components/dialog/Dialog.d';

import DocTitle from '../DocTitle';

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
        header="Ini Dialog Header"
        visible={visible}
        onVisibleChange={setVisible}
        {...{ closeOnEscape, closeOnBlur, useCloseIcon, modal, size }}
      >
        <div className="flex flex-col gap-1">
          <span>ini dialog</span>
          <span>ngetes content</span>

          <div className="flex flex-col gap-1">
            <span>Dialog Width</span>
            <RadioButton
              fieldName="size"
              label="xs"
              optionValue="xs"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="sm"
              optionValue="sm"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="md"
              optionValue="md"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="lg"
              optionValue="lg"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="xl"
              optionValue="xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="2xl"
              optionValue="2xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="3xl"
              optionValue="3xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="4xl"
              optionValue="4xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="5xl"
              optionValue="5xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="6xl"
              optionValue="6xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="7xl"
              optionValue="7xl"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
            <RadioButton
              fieldName="size"
              label="full"
              optionValue="full"
              value={size}
              onChange={(e) => setSize(e as DialogProps['size'])}
            />
          </div>

          <ToggleSwitch
            label="Use Modal"
            value={modal}
            onChange={(e) => {
              setModal(Boolean(e));
            }}
          />
          <ToggleSwitch
            label="Close On Blur"
            value={closeOnBlur}
            onChange={(e) => {
              setCloseOnBlur(Boolean(e));
            }}
          />
          <ToggleSwitch
            label="Close On Escape"
            value={closeOnEscape}
            onChange={(e) => {
              setCloseOnEscape(Boolean(e));
            }}
          />
          <ToggleSwitch
            label="Use Close Icon"
            value={useCloseIcon}
            onChange={(e) => {
              setUseCloseIcon(Boolean(e));
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DialogDocs;
