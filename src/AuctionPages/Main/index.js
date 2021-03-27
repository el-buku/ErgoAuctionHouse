import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import ResizeDetector from 'react-resize-detector';

import AppMain from '../../Layout/AppMain';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closedSmallerSidebar: false,
            width: undefined
        };

    }

    onResize = (width) => this.setState({ width });

    render() {
        const { width } = this.state;

        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;

        return (
            <Fragment>
            <style>{`
@media (max-width: 768px){
.app-main {
    padding-top: 120px!important;
}
.fixed-sidebar.closed-sidebar:not(.fixed-header) .app-header {
    position: fixed!important;
    width: 100%!important;
}
.mb-2, .my-2 {
    margin-bottom: 0.1rem!important;
}
.app-header .app-header__content{right: 5% !important;}
}`}</style>
                <div className={cx(
                    "app-container app-theme-" + colorScheme,
                    {'fixed-header': enableFixedHeader},
                    {'fixed-sidebar': enableFixedSidebar || width < 1250},
                    {'fixed-footer': enableFixedFooter},
                    {'closed-sidebar': enableClosedSidebar || width < 1250},
                    {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
                    {'sidebar-mobile-open': enableMobileMenu},
                )}>
                    <AppMain/>
                    <ResizeDetector handleWidth onResize={this.onResize} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProp = state => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,

});

export default withRouter(connect(mapStateToProp)(Main));
