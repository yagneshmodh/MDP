import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList } from 'react-native';
import moment from 'moment';

import HelpButton from '../components/HelpButton';
import LocaleWrapper from '../HOC/LocaleWrapper';
// import I18n from '../i18n';
import actions from '../actions';

import MemberResource from '../components/MemberResource';

export class MemberResources extends Component {
  static propTypes = {
    memberResource: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.getMemberResource = this.getMemberResource.bind(this);
  }

  getMemberResource() {
    if (this.props.isConnected) {
      const { user, updatedOn } = this.props.auth;
      if (user) {
        if (moment().isBefore(moment(updatedOn).add(user.expires_in, 'seconds'))) {
          this.props.actions.getMemberResource(`${user.token_type} ${user.access_token}`);
        } else {
          this.props.actions
            .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
            .then(() => {
              this.props.actions.getMemberResource(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`);
            });
        }
      }
    }
  }

  render() {
    const { memberResource, auth } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {memberResource.data && (
          <FlatList
            data={memberResource.data}
            renderItem={({ item }) => <MemberResource item={item} />}
            keyExtractor={item => item.SectionID}
            refreshing={memberResource.loading || auth.loading}
            onRefresh={this.getMemberResource}
          />
        )}
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  memberResource: state.memberResource,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(MemberResources));
