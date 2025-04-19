import React, { useEffect, useState } from 'react';
import DocTitle from '../DocTitle';
import { FormProvider } from 'lib/context';
import { Button, Checkbox, Form, InputText } from 'lib/components';

const FormDocs: React.FC = () => {
  const [body, setBody] = useState({ collaboration: '' });

  useEffect(() => {
    console.log('FormDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="Form" />

      <FormProvider defaultValues={body}>
        <Form onSubmit={(e) => console.log(e)}>
          {/* <InputText label="First Name" fieldName="firstName" required />
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
            value={'Intern'}
            disabled
            info="Form pendaftaran intern"
          />
          <InputText
            label="Age"
            fieldName="age"
            type="number"
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
          <InputText type="email" fieldName="email" label="Email" required />
          <InputText
            type="password"
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
          /> */}
          <Checkbox
            fieldName="termsAndConditions"
            binary
            label="T&C Agreement"
          />
          <Checkbox
            fieldName="collaboration"
            tristate
            label="Collaboration Agreement"
          />
          <div className="flex flex-col gap-1">
            <span>Preset</span>
            <Checkbox
              fieldName="presets"
              value={'1'}
              label="Collaboration Agreement"
            />
            <Checkbox
              fieldName="presets"
              value={'2'}
              label="Collaboration Agreement"
            />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};

export default FormDocs;
