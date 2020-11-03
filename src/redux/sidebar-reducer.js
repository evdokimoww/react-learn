let initialState = {
    friend : [
        { id: 1, name: 'Alex', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
        { id: 2, name: 'Egor', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
        { id: 3, name: 'Anastasia', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
    ]
}

const sidebarReducer = (state = initialState, action) => {
    return state;
}
export default sidebarReducer;