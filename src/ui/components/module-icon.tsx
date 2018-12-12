import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, HTMLProps } from 'react';

import { ModuleType } from '@api/types';

interface Props extends HTMLProps<HTMLSpanElement> {
	isSmall?: boolean;
	moduleType: ModuleType;
}

@observer
export default class ModuleIcon extends Component<Props> {

	@computed
	private get className() {
		const { className = '', isSmall, moduleType } = this.props;

		const size = isSmall ? 'fa-lg' : 'fa-2x';

		switch (moduleType) {
			case 'atmospherics':
				return `fas fa-cloud ${className} ${size}`;
			case 'hygrometer':
				return `fas fa-tint ${className} ${size}`;
			case 'luxmeter':
				return `fas fa-lightbulb ${className} ${size}`;
			case 'thermometer':
				return `fas fa-thermometer-half ${className} ${size}`;
			default:
				return `fas fa-question ${className} ${size}`;
		}
	}

	@computed
	private get style() {
		const { moduleType } = this.props;

		switch (moduleType) {
			case 'atmospherics':
				return { color: '#b5b5b5' };
			case 'hygrometer':
				return { color: '#209cee' };
			case 'luxmeter':
				return { color: '#ffdd57' };
			case 'thermometer':
				return { color: '#ff3860' };
			default:
				return { color: '#dbdbdb' };
		}
	}

	render() {
		const { isSmall, moduleType, ...rest } = this.props;

		return <span {...rest} className={this.className} style={this.style}/>;
	}
}
