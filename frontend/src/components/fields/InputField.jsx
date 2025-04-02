import React from 'react';
import { useField } from 'formik';

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="w-100 h-16 py-2 px-4">
     
            <input
                {...field}
                {...props}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-md transition-all ${
                    meta.touched && meta.error ? 'border-red-500 focus:ring-red-500' : ''
                } ${props.className}`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default InputField;