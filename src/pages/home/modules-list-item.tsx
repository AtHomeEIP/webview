import { observer } from 'mobx-react';
import React, { AnchorHTMLAttributes, Component } from 'react';
import { Link } from 'react-router-dom';

import { Module } from '@api/types';
import ModuleIcon from '@components/module-icon';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	module: Module;
}

@observer
class ModulesListItem extends Component<Props> {

	public render() {
		const { module, ...rest } = this.props;

		const moduleLink = `/modules/${module.id}`;

		return (
			<Link to={moduleLink} {...rest}>
				<div className="card">
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

export {
	ModulesListItem as default,
};
