import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import func from './lib';

const components = {
	CreateIcon: (icon, css, prop) => {
		return (
			<span>
				<FontAwesomeIcon icon={icon} className={css} />
				<span>{prop}</span>
			</span>
		);
	},
};

export default components;
