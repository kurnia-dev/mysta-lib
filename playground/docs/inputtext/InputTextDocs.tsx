import React, { useEffect } from 'react';
import DocTitle from '../DocTitle';
import {
  InputEmail,
  InputNumber,
  InputPassword,
  InputText,
} from 'lib/components';

type InputTextValues = {
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

const InputTextDocs: React.FC = () => {
  useEffect(() => {
    console.log('InputTextDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="InputText" />
      <InputText label="Required" fieldName="firstName" required />
      <InputNumber
        label="Required hide mark"
        fieldName="firstName"
        required
        hideRequiredMark
      />
      <InputText label="Optional" fieldName="lastName" />
      <InputText
        label="Max length 5; prevent input on error"
        fieldName="nickName"
        required
        maxLength={5}
        preventInputOnError
      />
      <InputText
        label="Disabled & Tooltip"
        fieldName="employeeType"
        disabled
        info="disabled & tooltip"
      />
      <InputEmail fieldName="email" label="Email" />
      <InputPassword
        fieldName="password"
        label="Password"
        minLength={8}
        maxLength={30}
        passwordRequirements={[
          'alpha-numeric',
          'lowercase',
          'uppercase',
          'special-character',
        ]}
      />
    </div>
  );
};

export default InputTextDocs;
