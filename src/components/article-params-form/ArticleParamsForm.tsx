import { useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select/Select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	setAppliedState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appliedState,
	setAppliedState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedState, setSelectedState] = useState<ArticleStateType>(appliedState);
	const rootRef = useRef<HTMLElement | null>(null);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setAppliedState(selectedState);
		setIsOpen(false);
	};
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setSelectedState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>

					<Text as='h2' size={38} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						selected={selectedState.fontFamilyOption}
						options={fontFamilyOptions}
						title="Шрифт"
						onChange={(value) => setSelectedState((prev) => ({ ...prev, fontFamilyOption: value}))}
					/>

					<RadioGroup
						name='article-language'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						onChange={(value) => setSelectedState((prev) => ({ ...prev, fontSizeOption:value}))}
						title='Размер шрифта'
					/>

					<Select
						selected={selectedState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) => setSelectedState((prev) => ({ ...prev, fontColor: value}))}
					/>

					<Separator />

					<Select
						selected={selectedState.backgroundColor}
						options={backgroundColors}
						title=''
						onChange={(value) => setSelectedState((prev) => ({ ...prev, backgroundColor: value}))}
					/>

					<Select
						selected={selectedState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) => setSelectedState((prev) => ({ ...prev, contentWidth: value}))}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
					
				</form>
			</aside>
		</>
	);
};
