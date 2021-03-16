import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MatchParams = {
    userId: string
}

type MapStatePropsType = {
    profile: ProfileType,
    status: string
    authoriseUserId: number
}

type MapDispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
}

type PropsType = RouteComponentProps<MatchParams> & MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType>{
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authoriseUserId);
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(Number(userId));
        this.props.getStatus(Number(userId));
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: RouteComponentProps<MatchParams>, prevState: MapStatePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                        isOwner={!this.props.match.params.userId}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authoriseUserId: state.auth.userId
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, MatchParams, AppStateType>(
        mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);