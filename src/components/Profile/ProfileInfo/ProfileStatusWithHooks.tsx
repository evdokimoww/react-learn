import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }


    return <div>
        {!editMode &&
        <div>
            <span onClick={activateEditMode}>{props.status || 'none'}</span>
        </div>
        }
        {editMode &&
        <div>
            <input onBlur={deactivateEditMode} onChange={ onInputChanged } value={status}/>
        </div>
        }
    </div>
}