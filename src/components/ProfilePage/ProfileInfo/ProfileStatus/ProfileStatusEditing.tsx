import React, {useEffect, useState} from "react";
import "../../../../styles/profilePage/ProfileStatusEditing.scss";

type PropsType = {
    value:string
    onBlur:(value:string) => void
};

const ProfileStatusEditing: React.FC<PropsType> = (props) => {
    const [text, setText] = useState<string>(props.value);

    useEffect(() => {
        setText(props.value);
    }, [props.value]);

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }
    const onBlur = (e:React.FocusEvent<HTMLTextAreaElement>) => {
        props.onBlur(e.target.value);
    }

    return (
        <textarea
            autoFocus={true}
            value={text}
            onChange={onChange}
            onBlur={onBlur}
            className="ProfileStatusEditing w-100 h-100"
        />
    )
};

export default ProfileStatusEditing;