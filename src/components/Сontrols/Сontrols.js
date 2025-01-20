import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './BoxForm.css';
import { Form, InputNumber, Button, Space } from 'antd';
var BoxForm = function (_a) {
    var onSubmit = _a.onSubmit;
    var form = Form.useForm()[0];
    var fields = [
        { label: 'Height', name: 'height', min: 1 },
        { label: 'Width', name: 'width', min: 1 },
        { label: 'Length', name: 'length', min: 1 },
    ];
    var handleSubmit = function () {
        form
            .validateFields()
            .then(function (values) {
            onSubmit(values);
        })
            .catch(function (info) {
            console.log('Ошибка валидации:', info);
        });
    };
    return (_jsx("div", { className: 'form', children: _jsxs(Form, { form: form, layout: 'vertical', children: [fields.map(function (_a) {
                    var label = _a.label, name = _a.name, min = _a.min;
                    return (_jsx(Form.Item, { label: label, name: name, rules: [
                            {
                                required: true,
                                message: "\u041F\u043E\u043B\u0435 ".concat(label.toLowerCase(), " \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435!"),
                            },
                        ], children: _jsx(InputNumber, { min: min }) }, name));
                }), _jsx(Form.Item, { children: _jsx(Space, { children: _jsx(Button, { type: 'primary', onClick: handleSubmit, children: "Calculate" }) }) })] }) }));
};
export default BoxForm;
