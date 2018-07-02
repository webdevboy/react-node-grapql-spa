import React, { Component } from 'react';
import { Popover, MenuItem, Menu, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import cx from "classnames";
import Action from '../Action';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';
import { toLower } from 'lodash';

class Page extends Component {

	render() {
		const { 
			children,
			actions,
			breadcrumbs,
			filters,
			actionPopover,
			interfaces,
			handleInterfaceChanged
		} = this.props;

		const renderMenuItem = ({ handleClick, item, isActive }) => (
			<MenuItem
				className={cx("active")}
				// label={item}
				onClick={handleClick}
				text={item.name}
			/>);

		const predicateMenuItem = (query, item, index) => {
			const entry = toLower(`${item.name}`);
			const loweredQuery = query.toLowerCase();
			return String(entry).includes(loweredQuery);
		}

		const NoResult = (
			<MenuItem
				iconName="pt-icon-issue"
				text="No Results"
				intent={Intent.WARNING}
			/>
		);
		
		return (
			<div className="wrapper pt-dark">
				<LoadingBar style={{ backgroundColor: '#2EA2F8' }} />

				<div className="actions">
					<div className="actions-left">
						{breadcrumbs}
					</div>

					<div className="actions-right">
						<div className="filter-group">
							{ interfaces ? 
								<Select
									className={cx("pt-menu")}
									items={interfaces}
									itemRenderer={renderMenuItem}
									itemPredicate={predicateMenuItem}
									onItemSelect={handleInterfaceChanged}
									resetOnSelect
									noResults={<NoResult />}
									>
									<button className="pt-button pt-minimal pt-intent-primary pt-icon-add">Choose Template</button>
								</Select> : null }						
						</div>
						<div style={{ display: 'flex' }}>
							{filters}
						</div>
						<div className="actions-group">
							{ actions && actions.map((action) => {
								if (action.type === Action) {
								return action;
								}
								if (action.type && action.type.name !== 'Action') {
								return action;
								}
								return <Action {...action} />;
							})}
						</div>
						<Popover
							content={
								<Menu>
									{ actions && actions.map(
										action => (
											<MenuItem
											key={`collapsed-${action.key}`}
											onClick={() => action.action}
											iconName={action.icon}
											text={action.label}
											className={action.intent}
											/>
										),
									)}
								</Menu>
							}
							interactionKind={PopoverInteractionKind.CLICK}
							position={Position.LEFT_TOP}
							inline>
							<button className={'pt-button pt-minimal pt-icon-more actions-collapsed'}></button>
						</Popover>						
						{/* <div className={cx("pt-input-group lj-search")}>
							<span className="pt-icon pt-icon-search"/>
							<input type="text" className="pt-input" placeholder={label} onChange={search}/>              
						</div> */}
					</div>					
				</div>
				<div className={'body'}>
					{children}
				</div>
			</div>
		)
	}
}

Page.propTypes = {
	actions: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.arrayOf(PropTypes.element)
	]),
	children: PropTypes.node.isRequired,
}

export default Page