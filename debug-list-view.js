import React from "react";
import { debugListView } from 'react-native-device-log';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Animated,
    TouchableOpacity,
    PixelRatio,
    NativeModules,
    LayoutAnimation,
} from "react-native";
import InvertibleScrollView from "react-native-invertible-scroll-view";

const PRIMARY_COLOR = "#5787cf";
const SELECT_COLOR = "#FFFFCC";
const SEPERATOR_COLOR = "#FF8000";
const SECONDARY_COLOR = "#FFFFFF";
const TEXT_COLOR = "#5787cf";
const LISTVIEW_REF = "listview";
class DebugListView extends debugListView {

    onRowPress(sectionID, rowID) {
        let rowBefore = this.preparedRows[rowID];
        if (this.props.multiExpanded) {
            const row = this.state.rows.find(row => row.id === rowID);
            row.expanded = !row.expanded;
            rowBefore = row
        } else {
            this.state.rows.forEach(row => {
                row.expanded = row.id === rowID && !row.expanded;
            });
        }
        this.preparedRows = this.prepareRows(this.state.rows);
        this.preparedRows[rowID].expanded = rowBefore.expanded
        LayoutAnimation.configureNext({
            update: {
                springDamping: 0.7,
                type: "spring",
            },
            duration: 650,
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.preparedRows),
        });
    }

    _renderSeperator(rowData, sectionID, rowID, highlightRow, animationStyle) {
        const seperatorStyles = [
            styles.logRowMessage,
            styles.logRowMessageBold,
            styles.seperator,
        ];
        return (
            <Animated.View
                style={[styles.debugRowContainer, animationStyle]}
                onLayout={this.onRowLayout.bind(this, rowData)}
            >
                <Text style={seperatorStyles}>*****</Text>
                <Text
                    style={[
                        styles.logRowMessage,
                        styles.logRowMessageMain,
                        styles.logRowMessageSeperator,
                    ]}
                >
                    {rowData.message}
                    - {rowData.timeStamp.format("YYYY-MM-DD HH:mm:ss")}
                </Text>
                <Text style={seperatorStyles}>*****</Text>
            </Animated.View>
        );
    }

    _renderLogRow(rowData, sectionID, rowID, highlightRow, animationStyle) {
        return (
            <Animated.View
                style={[
                    styles.debugRowContainer,
                    animationStyle,
                    {
                        backgroundColor: rowData.expanded
                            ? SELECT_COLOR
                            : "transparent",
                    },
                ]}
                onLayout={this.onRowLayout.bind(this, rowData)}
            >
                <TouchableOpacity
                    style={[
                        styles.debugRowContainerButton,
                        {
                            maxHeight: rowData.expanded ? undefined : 25,
                        },
                    ]}
                    onPress={this.onRowPress.bind(this, sectionID, rowID)}
                >
                    <Text
                        style={[styles.logRowMessage, styles.logRowLevelLabel]}
                    >
                        {`[${rowData.level.toUpperCase()}]`}
                    </Text>
                    <Text
                        style={[
                            styles.logRowMessage,
                            styles.logRowMessageMain,
                            {
                                color: rowData.color,
                            },
                        ]}
                    >
                        {rowData.message}
                    </Text>
                    <Text style={styles.logRowMessage}>
                        {this._formatTimeStamp(rowData.timeStamp, rowData)}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
    
    render() {
        const { rows, ...props } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.toolBar}>
                    <TouchableOpacity
                        style={styles.toolbarButton}
                        onPress={this.onPauseButtonPressed.bind(this)}
                    >
                        <Text style={styles.toolbarButtonText}>
                            {this.state.paused ? "Resume log" : "Pause log"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onCenterColumnPressed.bind(this)}
                        style={styles.centerColumn}
                    >
                        <Text style={styles.titleText}>{`${this.state.rows
                            .length} rows`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toolbarButton}
                        onPress={this.onClearButtonPressed.bind(this)}
                    >
                        <Text style={styles.toolbarButtonText}>Clear log</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                    <ListView
                        renderSeparator={this._renderSeparator.bind(this)}
                        keyboardShouldPersistTaps="always"
                        automaticallyAdjustContentInsets={false}
                        initialListSize={20}
                        pageSize={20}
                        renderScrollComponent={props =>
                            <InvertibleScrollView
                                {...props}
                                inverted={this.props.inverted}
                            />}
                        enableEmptySections={true}
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        {...props}
                    />
                </View>
            </View>
        );
    }

}
export {
    DebugListView
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY_COLOR,
        paddingTop: 5,
    },
    toolBar: {
        backgroundColor: SECONDARY_COLOR,
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 2,
        borderColor: PRIMARY_COLOR,
    },
    toolbarButton: {
        padding: 7,
        borderWidth: 2,
        borderRadius: 7,
        borderColor: PRIMARY_COLOR,
    },
    centerColumn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        color: "#5787cf",
        fontWeight: "bold",
        fontFamily: "System",
        fontSize: 16,
        alignSelf: "center",
        textAlign: "center",
    },
    toolbarButtonText: {
        color: TEXT_COLOR,
        fontFamily: "System",
        fontSize: 12,
    },
    listContainer: {
        flex: 1,
    },
    debugRowContainer: {
        padding: 5,
        flex: 1,
        flexDirection: "row",
        backgroundColor: SECONDARY_COLOR,
        borderStyle: "solid",
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: PRIMARY_COLOR,
    },
    debugRowContainerButton: {
        flexDirection: "row",
        flex: 1,
        overflow: "hidden",
    },
    logRowMessage: {
        color: TEXT_COLOR,
        fontFamily: "System",
        fontSize: 11,
        paddingHorizontal: 5,
        lineHeight: 20,
    },
    logRowMessageBold: {
        fontWeight: "bold",
    },
    logRowLevelLabel: {
        minWidth: 80,
        fontWeight: "bold",
    },
    logRowMessageSeperator: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
        color: SEPERATOR_COLOR,
    },
    seperator: {
        fontSize: 18,
        color: SEPERATOR_COLOR,
    },
    logRowMessageMain: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});