import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import TeamMemberList from '../../components/Content/Lists/TeamMemberList';
import Page from '../page';
import GET_TEAM_MEMBERS from '../../queries/getTeamMembers.graphql';
import { Query, graphql } from 'react-apollo';
import JoinTeam from "themes/lunajets/components/Content/SimpleSubHeader"

export class Team extends Component {
    render() {
		const { hreflangs } = this.props;
		const { post } = this.props;
		let jsonBody;
		const body = post.body.main;
		if (typeof body === "string") {
			jsonBody = body;
		} else {
			jsonBody = JSON.stringify(body);
		}

		const heading = {
			subtitle: {
				defaultMessage: 'TEAM',
				id: "client.team.subtitle",
				color: "lt-blue",
			},
			title: {
        defaultMessage: "MEET YOUR TEAM OF PRIVATE AVIATION ADVISORS",
        id: "client.team.title",
			},
			content: {
				defaultMessage: jsonBody,
			},
		};

      return (
			<Page post={post} hreflangs={hreflangs} joinTeam="true">
				<Header background={post.media.src} />
				<div className="container px-0">
					<SectionDescription section={heading} />
					<Query query={GET_TEAM_MEMBERS} variables={{ taxonomies: 'team_department', language_id: this.props.lang_id }}>
						{({ loading, error, data }) => {							
							if (loading) return null;
							if (error) return `Error!: ${error}`;
					
							return <TeamMemberList loading={loading} list={data.teams}/>
						}}
					</Query>
				</div>
			</Page>
      );
    }
}

const mapStateToProps = (state) => ({
	lang_id: state.runtime.availableLocales[state.intl.locale || state.intl.defaultLocale].id

});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
