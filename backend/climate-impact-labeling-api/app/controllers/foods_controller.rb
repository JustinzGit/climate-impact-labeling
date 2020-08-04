class FoodsController < ApplicationController
  before_action :set_food, only: [:show, :update, :destroy]

  # GET /foods
  def index
    @foods = Food.all

    render json: @foods
  end

  # GET /foods/1
  def show
    render json: @food, include: [:emission_category, :food_nutrients]
  end

  # GET /foods/barcode/1
  def barcode_show
    @food = Food.find_by(gtin_upc: params[:id])
    render json: @food, include: [:emission_category, :food_nutrients]
  end 

  # GET /foods/search/name
  def search
    @foods = Food.search(params[:name]).first(5)
    render json: @foods
  end 

  # POST /foods
  def create
    @food = Food.new(food_params)

    if @food.save
      render json: @food, status: :created, location: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foods/1
  def update
    if @food.update(food_params)
      render json: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foods/1
  def destroy
    @food.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food
      @food = Food.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_params
      params.require(:food).permit(:fdc_id, :brand_owner, :gtin_upc, :ingredients, :serving_size, :household_serving_fulltext, :food_category, :emission_category_id)
    end
end
