type Friend = {
    id: number
    name: string
    src: string
}

let initialState = {
    friend : [
        { id: 1, name: 'Alex', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
        { id: 2, name: 'Egor', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
        { id: 3, name: 'Anastasia', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
    ] as Array<Friend>
}

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}
export default sidebarReducer;