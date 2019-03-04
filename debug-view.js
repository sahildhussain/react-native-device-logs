import React from "react";
import { View, StyleSheet } from "react-native";
import { LogView } from "react-native-device-log";
import { DebugListView } from "./debug-list-view";

export default class LogsView extends LogView {

    render() {
        return ( 
        <View style = { styles.container }>
            <DebugListView rows = {this.state.rows} {...this.props}/> 
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});