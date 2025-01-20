import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './BoxForm.css';
import { Form, InputNumber, Button, Space, Switch } from 'antd';
import { Icon } from '../../shared/Icon/Icon';
var BoxForm = function (_a) {
    var onSubmit = _a.onSubmit, darkMode = _a.darkMode, toggleTheme = _a.toggleTheme;
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
            .catch(function (error) {
            console.log('Ошибка валидации:', error);
        });
    };
    return (_jsx("div", { className: 'form', style: { backgroundColor: darkMode ? '#010B12' : '#222' }, children: _jsxs(Form, { form: form, layout: 'vertical', children: [fields.map(function (_a) {
                    var label = _a.label, name = _a.name, min = _a.min;
                    return (_jsx(Form.Item, { label: label, name: name, rules: [
                            {
                                required: true,
                                message: "\u041F\u043E\u043B\u0435 ".concat(label.toLowerCase(), " \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435!"),
                            },
                        ], children: _jsx(InputNumber, { min: min }) }, name));
                }), _jsxs(Form.Item, { children: [_jsx(Space, { children: _jsx(Button, { type: 'primary', onClick: handleSubmit, children: "Calculate" }) }), _jsx("div", { className: 'switcher', children: _jsx(Switch, { checked: darkMode, onChange: toggleTheme, checkedChildren: _jsx(Icon, { id: 'moon', className: 'svg-moon' }), unCheckedChildren: _jsx(Icon, { id: 'sun' }) }) })] })] }) }));
};
export default BoxForm;
