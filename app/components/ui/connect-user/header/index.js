// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Header = ( { intention } ) => {
	let heading = '';
	let text = '';

	if ( intention === 'signup' ) {
		heading = i18n.translate( 'Your domain awaits' );
		text = i18n.translate( 'Enter your email address to start your application.' );
	} else if ( intention === 'verifyUser' ) {
		heading = i18n.translate( 'Check your email' );

		text = i18n.translate( 'We sent you a special link to confirm your email address. ' +
			'Look for an email from get.blog and click the link to continue.' );
	}

	return (
		<div className={ styles.container }>
			<div className={ styles.header }>
				{ heading && (
					<h2 className={ styles.heading }>
						{ heading }
					</h2>
				) }

				{ text && (
					<p className={ styles.text }>
						{ text }
					</p>
				) }
			</div>
		</div>
	);
};

Header.propTypes = {
	intention: PropTypes.string.isRequired
};

export default withStyles( styles )( Header );
