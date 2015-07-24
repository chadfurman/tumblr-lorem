console.log('configuring application');
var blogName = "distinguishedrebeltrash";
var maxNumberOfPosts = 30; // keep this low...
var maxNumberOfTags = 10; // keep this low...
var supportedPostTypes = [ 'photo', 'quote', 'text', 'link', 'chat', 'audio', 'video' ];

console.log('including dependencies');
// Authenticate via OAuth
var tumblr = require('tumblr.js');
var faker = require('faker');
var dotenv = require('dotenv').load();

console.log('preparing oauth');
var client = tumblr.createClient({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	token: process.env.TOKEN,
	token_secret: process.env.TOKEN_SECRET
});

console.log('connected');
var numberOfPosts = Math.floor(Math.random() * maxNumberOfPosts);
for (var i = 0; i < numberOfPosts; i++) {
  var type = supportedPostTypes[Math.floor(supportedPostTypes.length * Math.random())];
	submit(type);
}
console.log('The end.');

function submit(type) {
	var options = getOptions(type);
	console.log('submitting ' + type + ' post: ' + JSON.stringify(options, null, 4));
	client[type](blogName, options);
}

function getOptions(type) {
	var options = {
		type: type,
		tags: []
	};

	var numberOfTags = Math.floor(Math.random() * maxNumberOfTags);
	for (var i = 0; i < numberOfTags; i++) {
		options.tags.push(faker.hacker.adjective());
	}

	switch (type) {
		case 'photo':
			options.caption = faker.lorem.sentence();
			options.link = faker.internet.url();
			options.source = 'http://lorempixel.com/' + Math.floor(Math.random() * 800) + '/' + Math.floor(Math.random() * 800);
			break;

		case 'quote':
			options.quote = faker.lorem.paragraph();
			options.source = faker.internet.url();
			break;

		case 'text':
			options.title = faker.lorem.sentence();
			options.body = faker.lorem.paragraphs();
			break;

		case 'link':
			options.title = faker.lorem.sentence();
			options.url = faker.internet.url();
			options.description = faker.lorem.paragraph();
			break;

		case 'chat':
			options.title = faker.lorem.sentence();
			options.conversation = [];
			for (var i = 0; i < faker.random.number(); i++) {
				options.conversation.push(faker.name.firstName + ': ' + faker.lorem.sentences());
			}
			break;

		case 'audio':
			options.caption = faker.lorem.sentence();
			options.external_url = "http://asdf.com/sarah_beara_asdfsong.wav";
			break;

		case 'video':
			options.caption = faker.lorem.sentence();
			options.embed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dRjE1JwdDLI" frameborder="0" allowfullscreen></iframe>';
			break;
		default:
			return null;
	}

	return options;
}
