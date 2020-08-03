import React from "react";

type PropsType = {
    placeholder:string
    value:string
    name:string
    handleChange: (e:React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    errors:string|undefined
    touched:boolean|undefined
    type:string
};

const FormikField: React.FC<PropsType> = (props) => {
    return (
        <>
            <input
                type={props.type}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
                onBlur={props.handleBlur}
                className="Input"
                placeholder={props.placeholder}
            />
            {(props.touched && props.errors) && (
                <div className="ErrorField">{props.errors}</div>
            )}
        </>
    )
};

export default FormikField;