// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Ti.include('rsstableview.js');


var navigation = Titanium.UI.iPhone.createNavigationGroup({
	window:rssTableView
});

var window = Titanium.UI.createWindow({backgroundColor: '#fff'});
window.add(navigation);

window.open();
