require 'csv'
require 'active_support/inflector'

# Seeds rails database from provided files
Dir.each_child("./usda_files") do |file|

    # Read and parse data from file
    data = CSV.parse(File.read("./usda_files/#{file}"))

    # Store columns into an array 
    columns = data.shift

    # Convert column names to symbols
    columns.map! &:to_sym

    # Derive model name from file
    file = file.split(/.csv|_/)
    file.map! &:capitalize
    model_name = file.join().singularize

    # Obtain constant value
    model = Object.const_get(model_name)

    # Import data into rails model 
    model.import columns, data
end 