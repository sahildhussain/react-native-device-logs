using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Device.Logs.RNReactNativeDeviceLogs
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeDeviceLogsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeDeviceLogsModule"/>.
        /// </summary>
        internal RNReactNativeDeviceLogsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeDeviceLogs";
            }
        }
    }
}
