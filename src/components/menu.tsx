import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import stores from '@store';

@observer
class Menu extends Component {

	@observable
	private _showMenu = false;

	public render() {
		const { i18n: i18nStore } = stores;

		const burgerClassName = this._showMenu
			? 'navbar-burger is-active'
			: 'navbar-burger';
		const menuClassName = this._showMenu
			? 'navbar-menu is-active'
			: 'navbar-menu';

		return (
			<nav className="navbar is-fixed-top">
				<div className="navbar-brand">
					<a className={burgerClassName} onClick={this.toggleMenu} role="button">
						<span aria-hidden/>
						<span aria-hidden/>
						<span aria-hidden/>
					</a>
				</div>

				<div className={menuClassName}>
					<div className="navbar-end">
						<NavLink className="navbar-item" activeClassName="is-active" exact to="/">
							{i18nStore.current.home}
						</NavLink>
						<NavLink className="navbar-item" activeClassName="is-active" exact to="/settings">
							{i18nStore.current.settings}
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

export {
	Menu as default,
};
