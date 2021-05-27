# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_07_041329) do

  create_table "emission_categories", force: :cascade do |t|
    t.string "food_category"
    t.integer "land_use"
    t.integer "ghg_emissions"
    t.integer "acidifying_emissions"
    t.integer "eutrophying_emissions"
    t.integer "freshwater_withdrawl"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "foods", force: :cascade do |t|
    t.integer "fdc_id"
    t.string "brand_owner"
    t.integer "gtin_upc"
    t.string "ingredients"
    t.integer "serving_size"
    t.string "serving_size_unit"
    t.string "household_serving_fulltext"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.integer "calories"
    t.integer "total_fat"
    t.integer "saturated_fat"
    t.integer "trans_fat"
    t.integer "cholesterol"
    t.integer "sodium"
    t.integer "carbohydrate"
    t.integer "fiber"
    t.integer "sugars"
    t.integer "protein"
    t.integer "vitamin_a"
    t.integer "vitamin_c"
    t.integer "calcium"
    t.integer "iron"
    t.integer "emission_category_id"
  end

end
