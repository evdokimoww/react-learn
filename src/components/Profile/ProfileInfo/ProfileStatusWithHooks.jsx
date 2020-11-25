import React, {useEffect, useState} from "react";

export const ProfileStatusWithHooks = (props) => {
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

    let onInputChanged = (e) => {
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