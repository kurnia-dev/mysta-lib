import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Checkbox,
  DialogForm,
  InputEmail,
  InputNumber,
  InputPassword,
  InputText,
  RadioButton,
  ToggleSwitch,
} from 'lib/components';
import { FormHandle } from 'lib/components/form/Form.d';

import DocTitle from '../DocTitle';

type DialogFormValues = {
  firstName: string;
  lastName?: string;
  nickName: string;
  employeeType: string;
  age?: number;
  siblings?: string;
  email: string;
  password: string;
  permanentEmployee: boolean;
  isIntern: boolean;
  termsAndConditions: boolean;
  collaboration: boolean | null;
  presets: string[];
  type: 'Admin' | 'Member';
  workType: 'On-Site';
  isApproved: boolean | null;
  isActive: boolean;
};

const DialogFormDocs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormHandle<DialogFormValues>>(null);

  useEffect(() => {
    console.log('DialogFormDocs mounted!');
  }, []);

  const initialValue = {
    employeeType: 'Intern',
    permanentEmployee: false,
    isIntern: true,
    isActive: true,
    type: 'Member',
    workType: 'On-Site',
    presets: [{ a: 'a', aa: 'aa' }],
    isApproved: false,
  };

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="DialogForm" />

      <Button
        label="Open Dialog"
        type="button"
        onClick={() => setVisible(true)}
      />

      <DialogForm
        buttonsConfig={[
          { type: 'back' },
          { type: 'reset' },
          { type: 'submit' },
        ]}
        defaultValues={initialValue}
        header="Dialog Form"
        ref={formRef}
        visible={visible}
        onSubmit={(e) => console.log(e)}
        onVisibleChange={setVisible}
      >
        <InputText required fieldName="firstName" label="First Name" />
        <InputText fieldName="lastName" label="Last Name" />
        <InputText
          preventInputOnError
          required
          fieldName="nickName"
          label="Nick Name"
          maxLength={5}
        />
        <InputText
          disabled
          fieldName="employeeType"
          info="DialogForm pendaftaran intern"
          label="Employee Type"
        />
        <InputNumber
          fieldName="age"
          info="Age range 24 to 30"
          label="Age"
          max={30}
          min={24}
        />
        <InputText
          preventInputOnError
          fieldName="siblings"
          label="Siblings"
          pattern={/^\d+$/}
        />
        <InputEmail required fieldName="email" label="Email" />
        <InputPassword
          required
          fieldName="password"
          label="Password"
          maxLength={30}
          minLength={8}
          passwordRequirements={[
            'alpha-numeric',
            'lowercase',
            'uppercase',
            'special-character',
          ]}
        />
        <Checkbox
          disabled
          fieldName="permanentEmployee"
          label="Permanent Employee"
          mode="binary"
        />
        <Checkbox
          disabled
          fieldName="isIntern"
          label="Intern Employee"
          mode="binary"
        />
        <Checkbox
          required
          fieldName="termsAndConditions"
          label="T&C Agreement"
          mode="binary"
        />
        <Checkbox
          required
          fieldName="collaboration"
          label="Collaboration Agreement"
          mode="tristate"
        />
        <div className="flex flex-col gap-1">
          <span>Preset</span>
          <Checkbox
            hideRequiredMark
            required
            fieldName="presets"
            label="Preset 1"
            mode="value"
            optionValue={{ a: 'a', aa: 'aa' }}
          />
          <Checkbox
            hideRequiredMark
            required
            fieldName="presets"
            label="Preset 2"
            mode="value"
            optionValue={{ b: 'b', bb: 'bb' }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Type</span>
          <RadioButton
            hideRequiredMark
            required
            fieldName="type"
            label="Admin"
            optionValue="Admin"
          />
          <RadioButton
            hideRequiredMark
            required
            fieldName="type"
            label="Member"
            optionValue="Member"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Work Type</span>
          <RadioButton
            disabled
            hideRequiredMark
            required
            fieldName="workType"
            label="On-Site"
            optionValue="On-Site"
          />
        </div>
        <ToggleSwitch disabled required fieldName="isActive" label="Active" />
        <ToggleSwitch
          required
          fieldName="isApproved"
          label="Approve"
          mode="tristate"
        />
      </DialogForm>
    </div>
  );
};

export default DialogFormDocs;
