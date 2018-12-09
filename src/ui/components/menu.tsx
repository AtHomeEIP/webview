import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import stores from '@store';

@observer
export default class Menu extends Component {

	@observable
	private _showMenu = false;

	@computed
	private get burgerClassName() {
		return this._showMenu
			? 'navbar-burger is-active'
			: 'navbar-burger';
	}

	@computed
	private get menuClassName() {
		return this._showMenu
			? 'navbar-menu is-active'
			: 'navbar-menu';
	}

	render() {
		return (
			<nav className="navbar is-fixed-top">
				<div className="navbar-brand">
					<a className={this.burgerClassName} onClick={this.toggleMenu} role="button">
						<span aria-hidden/>
						<span aria-hidden/>
						<span aria-hidden/>
					</a>
				</div>

				<div className={this.menuClassName}>
					<div className="navbar-end">
						<NavLink className="navbar-item" activeClassName="is-active" to="/" exact>
							{stores.i18n.current.pages.home}
						</NavLink>
						<NavLink className="navbar-item" activeClassName="is-active" to="/settings" exact>
							{stores.i18n.current.pages.settings}
						</NavLink>
					</div>
				</div>
			</nav>
		);
	}

	@action.bound
	private toggleMenu() {
		this._showMenu = !this._showMenu;
	}
}
