import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import func from './lib';
import { text } from '@fortawesome/fontawesome-svg-core';

const components = {
	CreateIcon: (className = null, icon, css, prop) => {
		return (
			<div className={className}>
				<FontAwesomeIcon icon={icon} className={css} />
				<span>{prop}</span>
			</div>
		);
	},

	Star: () => {
		return (
			<span>
				<FontAwesomeIcon icon={faStar} />
			</span>
		);
	}
};

export default components;
