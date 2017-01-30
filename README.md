# Iris FrontEnd


### Environments
- Test
  - Url: http://test-iris-fe.herokuapp.com
  - Heroku App- test-iris-fe
  - Connects to Iris Engine Test Url: http://test-iris.universumglobal.com
  - Connects to Universum Access Staging: http://stage.universumacess.com
  - Connects to Business Profile Staging: http://stg-businessprofile.universumglobal.com
- Staging
  -: http://stg-iris-fe.herokuapp.com
  - Heroku App- stg-iris-fe
  - Connects to Iris Engine Staging: https://staging-iris.herokurapp.com
  - Connects to Universum Access Staging: http://stg-access.universum-acess.com
  - Connects to Business Profile Staging: http://stg-businessprofile.universumglobal.com
- Production
  -: http://prod-iris-fe.herokuapp.com
  - Heroku App- prod-iris-fe
  - Connects to Iris Engine Production: https://iris.universumglobal.com
  - Connects to Universum Access Production: http://universum-access.com
  - Connects to Business Profile Production: http://businessprofile.universumglobal.com
 

## Setting up the development environment

**Note:** You probably want to use rvm here to set up a separate gemset for each application, see [https://rvm.io](https://rvm.io).

## Prerequesites
  - This guide assumes that you are using a Linux/Mac machine for development. You will need the following packages installed in your system in order to run Iris. 
  - Ruby (2.2.0 and above)
  - Rails (4.2.1)
  - Postgres (https://www.postgresql.org/download/linux/ubuntu/)
  - Redis (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis)
  - Sidekiq (https://github.com/mperham/sidekiq)
  - Elastic Search (https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-14-04)

## BP setup

```sh
git clone git@github.com:Universum/businessprofile.git
cd businessprofile
bundle install
```

### DB setup & seed

Please also check for changes in the setup routine here: [UniversumAccess](https://github.com/Universum/universum-access).

```sh
rake db:create db:migrate db:seed
```

If you also need the fields of study set up, you need to run this:

```sh
rake import_country:fos
```

To import companies (aka business units) for a year, run:

```sh
for i in {1..6}; do rake create_business_units:import_from_csv[2016_${i}]; done
```

For available data see `./lib/csv/listing/`.

### ApiKey

Set up an api key for Iris on the rails console:

```ruby
ApiKey.create access_app_name: "iris-fe", access_token: < Create a random token >
```

**Notes:**
 - The `access_token` should be the same as the BP_TOKEN in the `.env` of Iris.

### Admin user

Set up an BP admin user on the rails console:

```ruby
User.find_or_initialize_by(email: '<your email>').update first_name: "<first_name>", last_name: "<last_name>", password: "<password>", source_type: 'business_profile', status: 'confirmed', role_type_id: 1
```

### Starting BP

You are now ready to start BP:

```sh
rails s -p 3001
```

You can now log in under `http://localhost:3001` with `<your email>` and `<password>`.

### Steps for business unit setup in BP

- Go to "Businesses" using the main navigation
  - Choose the global business unit (e.g. Google).
  - If the global business unit it not created yet, do so by choosing "Create Global Business" on the top left
- Within the local business unit, on the tab called "Membership"
  - Setup an membership expiry date in the future and the current year as membership year (e.g. 2017)
  - Choose Emerald for membership
  - Target group as students, professionals, combined and merged as appropriate for the market or testing
- Within the local business unit, on the "Products" tab
  - Select at least "picnic" and "iris" to enable Access and Iris for the business unit
- Within the local business unit, on the "Contacts" tab
  - Create and invite a user, use the "Iris" template
- Go to "Data Dictionary" using the main navigation
- On the "Country FoS" tab
  - Select the country of the local business unit and check the Data Release date
  - If you have imported the business units and target groups the way described in [BP setup](#bp-setup), the default data release dates will probably be there already. If you need to develop for an upcoming market, change the data release data to the current date or earlier.
  - Also, make sure that the target groups have the correct name as specified in the matching document for that market


## UA setup

```sh
git clone git@github.com:Universum/universum-access.git
cd universum-access
bundle install
```

### Necessary ENV variables

```sh
export BP_TOKEN=<execute 'ApiKey.where(access_app_name: "universum_access").first.access_token' in rails console for BP>
export LOCAL_BP=true
```

**Note:** The token has been added to BP when you ran `rake:db:seed`.

### DB setup & seed

There currently is a bug in `./config/initializers/grape_swagger_rails.rb` that prevents migrations from going through. So the following section needs to be commented out:

```ruby
# if Rails.env.development? && !$rails_rake_task
#  token = ApiKey.find_by_app_name("swagger").try(:token) || ""
#  GrapeSwaggerRails.options.headers['Authorization'] = token
# end
```

Now you can run:

```sh
rake db:create db:migrate
```

**Note:** Remember to un-comment the section in `./config/initializers/grape_swagger_rails.rb` again!

### ApiKeys

```ruby
ApiKey.add_app "swagger"
ApiKey.create app_name: "business_profile", token: "<look in BP .env file for UATOKEN>"
```

### OAuth

```ruby
OAuth::Client.create name: "iris"
```

### Starting UA

You are now ready to start UA:

```sh
rails s -p 3000
```


## Iris Engine setup
Please follow the steps given in this link to setup Iris Engine: Url: https://github.com/Universum/iris

## Iris FrontEnd setup

```sh
git clone git@github.com:Universum/iris-fe.git
cd iris-fe
```

```sh
Iris Front-End relies on certain gems that have limited access, for example: sso-client, bpmodels etc. In order to access these gems we have added a separate github account, the token for which is shared along with the other ENV variables document. To configure this, please execute the following command in the terminal:

bundle config --local GITHUB__COM <access token for account>:x-oauth-basic

Once this is done, you can proceed with bundle:

bundle install
```

### DB setup & seed

```sh
# == Create database and migrate ==
rake db:create db:migrate
```

### Starting the server

```sh
rails s -p 3002

```

### Overview

This application consumes [UniversumAccess (UA)](https://github.com/Universum/universum-access) for SSO, [BusinessProfile (BP)](https://github.com/Universum/businessprofile) for Company data and [Iris Engine](https://github.com/Universum/iris) for posts and tags. You can run these locally.

- UA should be on port 3000
- BP should be on port 3001
- Iris front end should be on port 3002
- Iris Engine should be on port 3003

### Subdomains

This app expects to be on `http://access.whatever.com`, `http://stg-access.whatever.com.` ...

So, to develop locally you must also use these subdomains, otherwise the routing rules will not match.

`http://access.virtual.local:3002`

similarly

`http://iris.virtual.local:3002`

**Note:** It is ok for UA & BP to run normally on localhost on 3000 & 3001, the routing & address rules will be fine.

You can add a local subdomain by adding the following lines to `/etc/hosts`:

```
127.0.0.1       access.virtual.local
127.0.0.1       iris.virtual.local
```

**Note:** Remember to set the `ACCESS_ASSET_HOST` environment variable accordingly in the `.env` file.

```sh
export ACCESS_ASSET_HOST="http://access.virtual.local:3002"
```

You can also use `access.lvh.me`, although this makes an internet connection necessary.

If you don't provide `ACCESS_ASSET_HOST`, `access.lvh.me:3002` will be used for assets.

### Necessary ENV variables

The nececssary ENV variables will be shared as a separate document.

