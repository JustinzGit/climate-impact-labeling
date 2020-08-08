# Climate Impact Labeling
Climate Impact Labeling is a web application built to inform consumers about food product purchases and their impact on green house gas (GHG) emissions. Users search food products by name or by barcode (GTIN/UPC) and are provided an emission rating of low/moderate/high. Users are also provided nutrition data and data pertaining to a products agricultural impact. This includes a products land usage, acidification, eutrophication, and freshwater withdrawals. While energy accounts for the majority of emissions, food production is also a major contributor accounting for 26% of global GHG emissions that we the consumers can influence through our choices. 

Product information and nutritional data were obtained via the U.S. Department of Agriculture (USDA), Agriculutrual Research Service. [Food Data Central](https://fdc.nal.usda.gov/)

Data pertaining to a food products agricultural impact and GHG emissions were obtained from the work published by J.Poore and T.Nemecek in journal of Science. [Reducing food’s environmental impacts through producers and consumers](https://science.sciencemag.org/content/360/6392/987)

# Installation
- Clone this repository
- Be sure to have Node.js installed [Node.js](https://nodejs.org/en/)
- Be sure to have Ruby and Rails installed [Ruby on Rails Guide](https://guides.rubyonrails.org/v5.0/getting_started.html)
- Install the ruby gem `bundler` by running `gem install bundler` from the command line
- Install application dependencies by running `bundle install` from within climate-impact-labeling-api
- Run `rails server` from the terminal within climate-impact-labeling-api to start a Rack supported server
- Run `npm install` from within the applications frontend directory to install dependencies 
- Open index.html found within the applictions frontend directory in a browser window to search products and access data

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/JustinzGit/climate-impact-labeling. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License
This application is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).