import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true
        }
      );

      // And set its HTML content
      panel.webview.html = getWebviewContent(panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'web'))));
    })
  );
}

function getWebviewContent(webPath:vscode.Uri) {
  return `<html>
  <!--
	  WebSocket chat client
  
	  WebSocket and WebRTC based multi-user chat sample with two-way video
	  calling, including use of TURN if applicable or necessary.
  
	  This file provides the structure of the chat client's web page, including
	  logging in, text chatting, and making private video calls to other users.
  
	  To read about how this sample works:  http://bit.ly/webrtc-from-chat
  
	  Any copyright is dedicated to the Public Domain.
	  http:   creativecommons.org/publicdomain/zero/1.0/
  -->
  <head>
	<title>WebSocket Chat Demo with WebRTC Calling</title>
	<meta charset="utf-8">
	<link href="${webPath}/chat.css" rel="stylesheet">
	<link href="${webPath}/shared.css" rel="stylesheet">
	<script type="text/javascript" src="${webPath}/chatclient.js"></script>
	<script src="${webPath}/adapter.js"></script>
  </head>
  <body>
	<div class="container">
	  <div class="infobox">
		<p>This is a simple chat system implemented using WebSockets. It works by sending packets of JSON back and forth with the server.
		  <a href="https://github.com/mdn/samples-server/tree/master/s/webrtc-from-chat">
		Check out the source</a> on Github.</p>
		<p class="mdn-disclaimer">This text and audio/video chat example is offered as-is for demonstration purposes only, and should not be used for any other purpose.
		</p>
		<p>Click a username in the user list to ask them to enter a one-on-one video chat with you.</p>
		<p>Enter a username: <input id="name" type="text" maxlength="12" required autocomplete="username" inputmode="verbatim" placeholder="Username">
		  <input type="button" name="login" value="Log in" onclick="connect()"></p>
	  </div>
	  <ul class="userlistbox"></ul>
	  <div class="chatbox"></div>
	  <div class="camerabox">
		<video id="received_video" autoplay></video>
		<video id="local_video" autoplay muted></video>
		<button id="hangup-button" onclick="hangUpCall();" role="button" disabled>
		  Hang Up
		</button>
	  </div>
	  <div class="empty-container"></div>
	  <div class="chat-controls">
		Chat:<br/>
		<input id="text" type="text" name="text" size="100" maxlength="256" placeholder="Say something meaningful..." autocomplete="off" onkeyup="handleKey(event)" disabled>
		<input type="button" id="send" name="send" value="Send" onclick="handleSendButton()" disabled>
	  </div>
	</div>
  </body>
  </html>
  `;
}