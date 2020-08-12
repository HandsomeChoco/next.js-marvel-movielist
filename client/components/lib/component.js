import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import func from './lib';

const components = {
	CreateIcon: (className = null, icon, css, prop) => {
		return (
			<div className={className}>
				<FontAwesomeIcon icon={icon} className={css} />
				<span>{prop}</span>
			</div>
		);
	},
};

export default components;
