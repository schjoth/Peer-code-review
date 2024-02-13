# Backend for Peer-code-review

## Folder structure

<code>models</code> contains the data classes and objects to contain information.

<code>dao</code> Here you can find the Data Access Objects, which deal with the _persistence_ layer of the application.

<code>services</code> Here the business logic is implemented.

<code>routes</code> Here you can find the endpoints for the rest API, aka the  _controller_ layer.

## Config

In order to connect to your own database you need to update the values in <code>
src/main/resources/application.conf</code>
