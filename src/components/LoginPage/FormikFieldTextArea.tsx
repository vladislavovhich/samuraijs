import React from "react";

type PropsType = {
    placeholder:string
    value:string
    name:string
    handleChange: (e:React.ChangeEvent<any>) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    errors:string|undefined
    touched:boolean|undefined
};

const FormikFieldTextarea: React.FC<PropsType> = (props) => {
    return (
        <>
            <textarea
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
                onBlur={props.handleBlur}
                className="TextareaInput"
                placeholder={props.placeholder}
            />
            {(props.touched && props.errors) && (
                <div className="ErrorField">{props.errors}</div>
            )}
        </>
    )
};

export default FormikFieldTextarea;