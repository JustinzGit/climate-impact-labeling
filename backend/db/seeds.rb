require 'csv'
require 'active_support/inflector'

# Seeds rails database from provided files
Dir.each_child("./project_files") do |file|

    # Read and parse data from file
    data = CSV.parse(File.read("./project_files/#{file}"))

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
    puts("#{model} IMPORTING")

    # Import data into rails model 
    model.import columns, data
    puts("#{model} IMPORT COMPLETE")
    puts
end 