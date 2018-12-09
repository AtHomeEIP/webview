import { observer } from 'mobx-react';
import React, { AnchorHTMLAttributes, Component } from 'react';
import { Link } from 'react-router-dom';

import { Module } from '@api/types';
import ModuleIcon from '@ui/components/module-icon';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	module: Module;
}

@observer
export default class ModulesListItem extends Component<Props> {

	render() {
		const { module, ...rest } = this.props;

		const moduleLink = `/modules/${module.id}`;

		return (
			<Link {...rest} to={moduleLink}>
				<div className="card" style={{ marginBottom: 15 }}>
					<div className="card-content">
						<article className="media">
							<figure className="media-left">
								<span className="icon is-medium">
									<ModuleIcon moduleType={module.type}/>
								</span>
							</figure>
							<div className="media-content">
								<div>
									<strong>{module.name}</strong>
								</div>
								<div>
									<small>{module.location}</small>
								</div>
							</div>
						</article>
					</div>
				</div>
			</Link>
		);
	}
}
