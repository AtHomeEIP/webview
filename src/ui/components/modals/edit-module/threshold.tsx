import { action, computed } from 'mobx';
import { observer } from 'mobx-react';
import React, { ChangeEvent, Component } from 'react';

import { ModuleThreshold } from '@api/types';

interface Props {
	min?: number;
	max?: number;
	threshold: ModuleThreshold;
	type: 'min' | 'max';
	unit: string;
}

@observer
export default class Threshold extends Component<Props> {

	@computed
	private get max() {
		const { max, threshold } = this.props;

		return max == null ? threshold.max : Math.min(max, threshold.max);
	}

	@computed
	private get min() {
		const { min, threshold } = this.props;

		return min == null ? threshold.min : Math.max(min, threshold.min);
	}

	@action.bound
	private handleThresholdChange(event: ChangeEvent<HTMLInputElement>) {
		const { threshold } = this.props;

		threshold.current = event.target.valueAsNumber;
	}

	render() {
		const { threshold, type, unit } = this.props;

		return (
			<div className="control">
				<input
					id={`threshold-${type}`} className="slider is-circle has-output is-link"
					min={this.min} max={this.max} step={1} type="range"
					value={threshold.current} onChange={this.handleThresholdChange}
					style={{ width: 'calc(100% - 5rem)' }}
				/>
				<output htmlFor={`threshold-${type}`} style={{ bottom: 0, marginLeft: '1rem', top: 0, width: '4rem' }}>
					{threshold.current}{unit}
				</output>
			</div>
		);
	}
}
