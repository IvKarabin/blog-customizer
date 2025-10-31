import { clsx } from 'clsx';

import styles from './Spacing.module.scss';

type TSpacingProps = {
	space: 'smallest' | 'small' | 'medium' | 'large' | 'largest';
};

export const Spacing = ({ space = 'medium' }: TSpacingProps) => {
	const className = clsx(styles.spacing, styles[`${space}`]);

	return <div className={className} />;
};