import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, HTMLProps } from 'react';

import { ModuleType } from '@api/types';

interface Props extends HTMLProps<HTMLSpanElement> {
	moduleType: ModuleType;
}

@observer
class ModuleIcon extends Component<Props> {

	public render() {
		const { moduleType, ...rest } = this.props;

		return <span {...rest} className={this.className} style={this.style}/>;
	}

	@computed
	private get className() {
		const { className = '', moduleType } = this.props;

		switch (moduleType) {
			case 'atmospherics':
				return `fas fa-lg fa-cloud ${className}`;
			case 'hygrometer':
				return `fas fa-lg fa-tint ${className}`;
			case 'luxmeter':
				return `fas fa-lg fa-lightbulb ${className}`;
			case 'thermometer':
				return `fas fa-lg fa-thermometer-half ${className}`;
			default:
				return `fas fa-lg fa-question ${className}`;
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
}

export {
	ModuleIcon as default,
};
