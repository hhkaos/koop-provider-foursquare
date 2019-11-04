# koop-provider-foursquare

This is just an experimental provider to simply get 50 venues from a given place and optionally filtering by [category](https://developer.foursquare.com/docs/resources/categories)

Usage: `/koop-provider-foursquare/<location>::<category>/FeatureServer/0/query`

Valid requests:

*  `http://localhost:8080/koop-provider-foursquare/Malaga::56aa371be4b08b9a8d573517/FeatureServer/0/query`
*  `http://localhost:8080/koop-provider-foursquare/Madrid/FeatureServer/0/query`

## Configuration

In order to run this provider you need to set up valid `cliend_id` and `client_secret` at `config/default.json` (`default_sample.json` provided <- you need to rename it).

> You can create a [free developer account here](https://foursquare.com/developers/apps)

## Development

### Testing

This project uses [mocah](https://www.npmjs.com/package/mocha) as the testing framework and [chaijs](https://www.chaijs.com/) as the assertion library. All test files in the `test` directory should have the special extension `.test.js`, which will be executed by the command:

```
$ npm test
```

### Dev Server

This project by default uses the [Koop CLI](https://github.com/koopjs/koop-cli) to set up the dev server. It can be invoded via

```
$ npm start
```

The server will be running at `http://localhost:8080` or at the port specified at the configuration.

For more details, check the [Koop CLI documentation](https://github.com/koopjs/koop-cli/blob/master/README.md).

You can also use [Koop-CLI](https://github.com/koopjs/koop-cli) to run this provider using koop serve.

## Deployment

If you are planning to deploy this provider then use [Koop-CLI](https://github.com/koopjs/koop-cli) as [explained here](https://koopjs.github.io/docs/basics/quickstart).

> Note: this provider can be installed using `koop add provider @koopjs/provider-foursquare`
