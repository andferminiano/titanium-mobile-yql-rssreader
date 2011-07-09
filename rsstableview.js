var rssTableView = Titanium.UI.createWindow({
		title: 'RSS Reader'
});
var webViewWindow = Titanium.UI.createWindow({});

var rowsData = [];

Titanium.Yahoo.yql('SELECT title, link, description FROM rss WHERE url = "http://www.andersonferminiano.com/blog/feed"', function(e){
	var results = e.data.item;
	
	for (var i in results){
		var rss = results[i];
		
		var rssRow = Titanium.UI.createTableViewRow({height: 150, link:rss.link, rssTitle: rss.title});
		var titleLabel = Titanium.UI.createLabel({
			text:rss.title,
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			top:5,
			left:40,
			height:16
		});
		
		var description = Titanium.UI.createTextArea({
			value:rss.description,
			top:25,
			left:35,
			font:{fontSize:12},
			height:120,
			width:280,
			touchEnabled:false,
			editable: false
		});
		
		var rssIcon =  Titanium.UI.createImageView({
			image:'images/rss.jpg',
			width:32,
			height:34,
			left:4,
			top:5
		});
		
		rssRow.add(titleLabel);
		rssRow.add(rssIcon);
		rssRow.add(description);
		
				
		rssRow.className = 'rssrow';
		rowsData.push(rssRow);
	}
	
	// create table view
	var tableView = Titanium.UI.createTableView({data:rowsData});
	rssTableView.add(tableView);
	
	tableView.addEventListener('click', function(e){
		var rowData = e.rowData;
		
		var webview = Titanium.UI.createWebView({
			url: rowData.link
		});
		
		var backButton = Titanium.UI.createButton({title:'Back'});
		
		backButton.addEventListener('click', function(){
			navigation.close(webViewWindow, {animated:'true'});
		});
		
		// create window for webview 
		webViewWindow = Titanium.UI.createWindow({
			title: rowData.rssTitle,
			leftNavButton: backButton
		});
		webViewWindow.add(webview);
		
		navigation.open(webViewWindow, {animated:'true'});
	});
	
});
