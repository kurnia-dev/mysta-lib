import React, { useEffect } from 'react';

import {
  InputEmail,
  InputNumber,
  InputPassword,
  InputText,
} from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const InputTextDocs: React.FC = () => {
  useEffect(() => {
    console.log('InputTextDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="InputText" />
      <InputText required fieldName="firstName" label="Required" />
      <InputNumber
        hideRequiredMark
        required
        fieldName="firstName"
        label="Required hide mark"
      />
      <InputText fieldName="lastName" label="Optional" />
      <InputText
        preventInputOnError
        required
        fieldName="nickName"
        label="Max length 5; prevent input on error"
        maxLength={5}
      />
      <InputText
        disabled
        fieldName="employeeType"
        info="disabled & tooltip"
        label="Disabled & Tooltip"
      />
      <InputEmail fieldName="email" label="Email" />
      <InputPassword
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
    </div>
  );
};

export default InputTextDocs;
