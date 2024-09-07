import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
const UserForm = () => {
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }, children: [_jsx("button", { id: "fetch-button", style: { marginBottom: '10px' }, children: "Fetch Elements" }), _jsx("textarea", { id: "elements-textarea", readOnly: true, style: { width: '300px', height: '200px' } }), _jsx("script", { src: "/static/demo/userform.js" })] }));
};
export default UserForm;
