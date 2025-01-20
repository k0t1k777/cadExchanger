import React from 'react';
import './BoxForm.css'
import { Form, InputNumber, Button, Space } from 'antd';

type BoxFormProps = {
  onSubmit: (params: { length: number; width: number; height: number }) => void;
};

const BoxForm: React.FC<BoxFormProps> = ({ onSubmit }) => {
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
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };
  
  return (
    <div className='form'>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default BoxForm;
