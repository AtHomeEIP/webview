import { computed } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { Component } from 'react';

import { ModuleSample, ModuleThreshold } from '@api/types';
import stores from '@store';

interface Props {
	sample: ModuleSample;
	thresholds: ModuleThreshold[];
}

@observer
export default class SamplesListItem extends Component<Props> {

	@computed
	private get sampleDate() {
		const { sample } = this.props;

		return moment(sample.date).format('DD/MM/YYYY');
	}

	@computed
	private get sampleMeasure() {
		return parseInt(this.sampleValue.measure, 10);
	}

	@computed
	private get sampleUnit() {
		const measure = this.sampleValue.unit_measure;

		return measure === 'C' ? `°${measure}` : measure;
	}

	@computed
	private get sampleValue() {
		const { sample } = this.props;

		return JSON.parse(sample.payload);
	}

	@computed
	private get status() {
		const [thresholdMin, thresholdMax] = this.props.thresholds;

		return this.sampleMeasure >= thresholdMin.current && this.sampleMeasure <= thresholdMax.current;
	}

	@computed
	private get sampleTime() {
		const { sample } = this.props;

		return moment(sample.date).format('HH:mm:ss');
	}

	render() {
		return (
			<div className="tile is-child">
				<article className={`notification ${this.status ? 'is-success' : 'is-danger'}`}>
					<p className="title">
						<strong className="is-size-1">
							{this.sampleMeasure}
						</strong>
						<sup>
							<small className="is-size-5">
								{this.sampleUnit}
							</small>
						</sup>
					</p>
					<p className="subtitle is-6">
						{stores.i18n.current.recordedOn} {this.sampleDate} {stores.i18n.current.at.toLowerCase()} {this.sampleTime}
					</p>
				</article>
			</div>
		);
	}
}
