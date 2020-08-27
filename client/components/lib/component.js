import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'

const components = {
	CreateIcon: (className = null, icon, css, prop) => {
		return (
			<div className={className}>
				<FontAwesomeIcon icon={icon} className={css} />
				<span>{prop}</span>
			</div>
		);
	},

	List: (className = null, arr, jsx) => {
		let list;
		
		typeof arr !== 'object' ? new Error('파라미터 arr 은 배열이어야 합니다.') : (
			list = arr.map((v, i) => {
				return(
					<li className={className} key={i}>
						{jsx(v)}
					</li>
				);
			})
		);
		return list;
	},
};

export default components;
