## PeTindrr


## Tech:
*  React Native
*  Redux
*  React Navigation
*  Expo


## Instructions:
1.  CommandLine: clone this repo, navigate into directory
2.  CommandLine: `npm install` to retrieve node dependencies
3.  Device: On a mobile device install the `Expo` app from the App Store or Play Store.  (thumbnail has a white background with black logo)
4.  CommandLine: run `expo start` - this will open up a browser tab.  
5.  Device:  Scan either the QR code in the browser or in the command line.  This will automatically open expo and start up PeTindrr.  On iOS: use the normal 'camera' app to scan the code, on Android use a QR scanner of your choice.
6.  Start swiping!

## Replacing the API origin:
*  To replace the API source for the user settings endpoint, go to `./petTinder/actions/petActions.js` and replace the url on line 6.
*  To replace the API source for the pet endpoint, go to `./petTinder/actions/userActions.js` and replace the url on line 6.


### Other Notes:
* when using expo you can restart the app at any time by shaking the device and tapping `Reload Manifest and JS Bundle`
* You can run this on a simulator as well by going to the browser tab that opens after doing `expo start` and clicking on `run on simulator`.  It is a bit buggy sometimes, if you have the simulator on your machine but get an error prompting you to install the simulator you should open the simulator manually from your desktop and try the `run on simulator button` again.  That said, the app works better, the simulator does handle certain animations well (i.e. the switch animation is clunky on simulator but clean on a device).  *I highly recommend trying on a device*.
