export function checkout( state = {}, action ) {
	const { domain, type } = action;

	switch ( type ) {
		case 'CREATE_SITE_COMPLETE':
			return Object.assign( {}, state, {
				site: {
					domain: action.domain,
					blogId: action.blogId
				}
			} );

		case 'CREATE_TRANSACTION_COMPLETE':
			return Object.assign( {}, state, {
				transaction: action.form
			} );

		case 'CREATE_USER_COMPLETE':
			return Object.assign( {}, state, {
				user: {
					username: action.username,
					email: action.email,
					password: action.password,
					bearerToken: action.bearerToken
				}
			} );

		case 'SELECT_DOMAIN':
			return { domain };

		default:
			return state;
	}
}