import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { ModuleSample, ModuleThreshold } from '@api/types';
import SamplesListItem from '@ui/pages/module/samples-list-item';

interface Props {
	samples: ModuleSample[];
	thresholds: ModuleThreshold[];
}

@observer
export default class SamplesList extends Component<Props> {

	render() {
		const { samples, thresholds } = this.props;

		const list = samples.map((sample, index) => (
			<SamplesListItem key={index} sample={sample} thresholds={thresholds}/>
		));

		return (
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical">
					{list}
				</div>
			</div>
		);
	}
}
