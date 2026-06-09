import React, { useEffect, useRef } from 'react';

import {
  Button,
  Checkbox,
  Form,
  Icon,
  InputText,
  RadioButton,
  ToggleSwitch,
} from '@mystaline/mysta-commons/components';
import { FormHandle } from '@mystaline/mysta-commons/components/form/Form.d';
import { useToast } from '@mystaline/mysta-commons/context/ToastContext';

import DocTitle from '../DocTitle';

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
  const { showToast } = useToast();

  useEffect(() => {
    console.log('FormDocs mounted!');
  }, []);

  useEffect(() => {
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
    firstName: 'aws',
    nickName: 'aws',
    email: 'aws@aws.aws',
    password: 'aWs123!@#',
    collaboration: null,
    termsAndCondition: false,
  };

  const openToast = () => {
    showToast({
      message: 'Tesssss',
      severity: 'success',
      icon: 'check-4',
      action: {
        label: 'Undo',
        command: async () => {
          console.log('Undo');
        },
      },
    });
  };

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex w">
      <DocTitle name="Form" />
      <Button onClick={openToast} />

      <Form
        buttonsConfig={[
          { type: 'back', label: 'Cancel' },
          { type: 'reset', label: 'Clear' },
          { type: 'submit', label: 'Submit' },
          { type: 'back', label: 'Cancel' },
        ]}
        columnPerRow={3}
        defaultValues={initialValue}
        pt={{
          button: {
            root: () => ({ className: '!h-9' }),
          },
        }}
        ref={formRef}
        onError={(e) => console.log(e)}
        onSubmit={(e) => console.log(e)}
      >
        {null}
        <Icon name="github" />
        <InputText
          required
          fieldName="firstName"
          label="First Name"
          pt={{
            input: () => ({ className: 'h-[30px] !rounded-lg' }),
            fieldWrapper: {
              field: () => ({ className: 'h-[32px] !rounded-lg' }),
            },
          }}
        />
        <InputText fieldName="lastName" label="Last Name" />
        <InputText
          preventInputOnError
          required
          fieldName="nickName"
          label="Nick Name"
          maxLength={5}
        />
        {/* <InputText
          disabled
          fieldName="employeeType"
          info="Form pendaftaran intern"
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
        /> */}
        {/* <Checkbox
          disabled
          fieldName="permanentEmployee"
          label="Permanent Employee"
          mode="binary"
          onChange={(e) => console.log(e)}
        />
        <Checkbox
          disabled
          fieldName="isIntern"
          label="Intern Employee"
          mode="binary"
          onChange={(e) => console.log(e)}
        /> */}
        <Checkbox
          required
          fieldName="termsAndConditions"
          label="T&C Agreement"
          mode="binary"
          onChange={(e) => console.log(e)}
        />
        <Checkbox
          required
          fieldName="collaboration"
          label="Collaboration Agreement"
          mode="tristate"
          onChange={(e) => console.log(e)}
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
            onChange={(e) => console.log(e)}
          />
          <Checkbox
            hideRequiredMark
            required
            fieldName="presets"
            label="Preset 2"
            mode="value"
            optionValue={{ b: 'b', bb: 'bb' }}
            onChange={(e) => console.log(e)}
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
            onChange={(e) => console.log(e)}
          />
          <RadioButton
            disabled
            hideRequiredMark
            required
            fieldName="workType"
            label="On-Site"
            optionValue={true}
            onChange={(e) => console.log(e)}
          />
        </div>
        <ToggleSwitch disabled required fieldName="isActive" label="Active" />
        <ToggleSwitch
          required
          fieldName="isApproved"
          label="Approve"
          mode="tristate"
        />
        {/* <Dropdown
          fieldName="dropdown1"
          info="Ini dropdown string"
          label="Tes Dropdown String"
          options={[
            { label: '1', value: 'satu' },
            { label: '2', value: 'dua' },
            { label: '3', value: 'tiga' },
            { label: '4', value: 'empat' },
          ]}
          placeholder="Pilih value string"
        />
        <Dropdown
          fieldName="dropdown2"
          info="Ini dropdown number"
          label="Tes Dropdown number"
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
          ]}
          placeholder="Pilih value number"
        />
        <Dropdown
          required
          fieldName="dropdown3"
          info="Ini dropdown object"
          label="Tes Dropdown object"
          options={[
            { label: 'A', value: { _id: 'AAAAA1', name: 'A1' } },
            { label: 'B', value: { _id: 'AAAAA2', name: 'A2' } },
            { label: 'C', value: { _id: 'AAAAA3', name: 'A3' } },
            { label: 'D', value: { _id: 'AAAAA4', name: 'A4' } },
          ]}
          placeholder="Pilih value object"
        /> */}
      </Form>
    </div>
  );
};

export default FormDocs;
