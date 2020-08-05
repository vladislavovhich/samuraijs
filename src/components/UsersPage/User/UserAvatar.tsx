import React, {useEffect, useState} from "react";
import UserAvatarLoadingSmall from "../../UserAvatar/UserAvatarLoadingSmall";
import UserAvatarSmall from "../../UserAvatar/UserAvatarSmall";

type PropsType = {
    photo:string
};

const UserAvatar: React.FC<PropsType> = (props) => {
    const [fetchingImage, toggleFetchingImage] = useState<boolean>(!!props.photo);

    const onLoadTogglFetchingImage = () => {
        toggleFetchingImage(false);
    }

    useEffect(() => {
        toggleFetchingImage(!!props.photo);
    }, [props.photo]);

    return (
        (!!props.photo) ? (
            <>
                {fetchingImage && <UserAvatarLoadingSmall/>}
                <img
                    src={props.photo}
                    alt="img"
                    className="User__imgAvatar"
                    onLoad={onLoadTogglFetchingImage}
                    hidden={fetchingImage}
                />
            </>
        ) : (
            <UserAvatarSmall/>
        )
    )
};

export default UserAvatar;