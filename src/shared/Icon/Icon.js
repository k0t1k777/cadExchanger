import { jsx as _jsx } from "react/jsx-runtime";
import './Icon.css';
import Icons from './icons/sprite.svg';
export var Icon = function (_a) {
    var id = _a.id, _b = _a.className, className = _b === void 0 ? 'svg' : _b;
    return (_jsx("svg", { className: className, children: _jsx("use", { href: "".concat(Icons, "#").concat(id) }) }));
};
