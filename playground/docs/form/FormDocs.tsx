import React, { useEffect, useRef } from 'react';
import DocTitle from '../DocTitle';
import {
  Checkbox,
  Form,
  InputText,
  InputNumber,
  InputPassword,
  InputEmail,
  RadioButton,
  ToggleSwitch,
} from 'lib/components';
import { FormHandle } from 'lib/components/form/Form.d';

type FormValues = {
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

const FormDocs: React.FC = () => {
  const formRef = useRef<FormHandle<FormValues>>(null);

  useEffect(() => {
    console.log('FormDocs mounted!');
    console.log(
      '🚀 ~ useEffect ~ formRef.current?.errors:',
      formRef.current?.errors,
    );
  }, [formRef.current?.errors]);

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
      <DocTitle name="Form" />

      <Form
        ref={formRef}
        onSubmit={(e) => console.log(e)}
        onError={(e) => console.log(e)}
        defaultValues={initialValue}
      >
        <InputText label="First Name" fieldName="firstName" required />
        <InputText label="Last Name" fieldName="lastName" />
        <InputText
          label="Nick Name"
          fieldName="nickName"
          required
          maxLength={5}
          preventInputOnError
        />
        <InputText
          label="Employee Type"
          fieldName="employeeType"
          disabled
          info="Form pendaftaran intern"
        />
        <InputNumber
          label="Age"
          fieldName="age"
          max={30}
          min={24}
          info="Age range 24 to 30"
        />
        <InputText
          label="Siblings"
          fieldName="siblings"
          pattern={/^\d+$/}
          preventInputOnError
        />
        <InputEmail fieldName="email" label="Email" required />
        <InputPassword
          fieldName="password"
          label="Password"
          required
          minLength={8}
          maxLength={30}
          passwordRequirements={[
            'alpha-numeric',
            'lowercase',
            'uppercase',
            'special-character',
          ]}
        />
        <Checkbox
          fieldName="permanentEmployee"
          mode="binary"
          disabled
          label="Permanent Employee"
        />
        <Checkbox
          fieldName="isIntern"
          mode="binary"
          disabled
          label="Intern Employee"
        />
        <Checkbox
          fieldName="termsAndConditions"
          mode="binary"
          label="T&C Agreement"
          required
        />
        <Checkbox
          fieldName="collaboration"
          mode="tristate"
          label="Collaboration Agreement"
          required
        />
        <div className="flex flex-col gap-1">
          <span>Preset</span>
          <Checkbox
            fieldName="presets"
            required
            optionValue={{ a: 'a', aa: 'aa' }}
            mode="value"
            label="Preset 1"
            hideRequiredMark
          />
          <Checkbox
            fieldName="presets"
            required
            optionValue={{ b: 'b', bb: 'bb' }}
            mode="value"
            label="Preset 2"
            hideRequiredMark
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Type</span>
          <RadioButton
            fieldName="type"
            required
            optionValue="Admin"
            label="Admin"
            hideRequiredMark
          />
          <RadioButton
            fieldName="type"
            required
            optionValue="Member"
            label="Member"
            hideRequiredMark
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Work Type</span>
          <RadioButton
            fieldName="workType"
            required
            optionValue="On-Site"
            label="On-Site"
            disabled
            hideRequiredMark
          />
        </div>
        <ToggleSwitch fieldName="isActive" required label="Active" disabled />
        <ToggleSwitch
          fieldName="isApproved"
          required
          mode="tristate"
          label="Approve"
        />
      </Form>
    </div>
  );
};

export default FormDocs;
