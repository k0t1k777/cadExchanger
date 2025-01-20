import React from 'react';
import './BoxForm.css';
import { Form, InputNumber, Button, Space, Switch } from 'antd';
import { Icon } from '../../shared/Icon/Icon';

type BoxFormProps = {
  onSubmit: (params: { length: number; width: number; height: number }) => void;
  darkMode: boolean;
  toggleTheme: (checked: boolean) => void;
};

const BoxForm: React.FC<BoxFormProps> = ({
  onSubmit,
  darkMode,
  toggleTheme,
}) => {
  const [form] = Form.useForm();

  const fields = [
    { label: 'Height', name: 'height', min: 1 },
    { label: 'Width', name: 'width', min: 1 },
    { label: 'Length', name: 'length', min: 1 },
  ];

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((error) => {
        console.log('Ошибка валидации:', error);
      });
  };

  return (
    <div className='form' style={{ backgroundColor: darkMode ? '#010B12' : '#222'}}>
      <Form form={form} layout='vertical'>
        {fields.map(({ label, name, min }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={[
              {
                required: true,
                message: `Поле ${label.toLowerCase()} обязательное!`,
              },
            ]}
          >
            <InputNumber min={min} />
          </Form.Item>
        ))}
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSubmit}>
              Calculate
            </Button>
          </Space>
          <div className='switcher'>
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              checkedChildren={<Icon id='moon' className='svg-moon' />}
              unCheckedChildren={<Icon id='sun' />}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BoxForm;
