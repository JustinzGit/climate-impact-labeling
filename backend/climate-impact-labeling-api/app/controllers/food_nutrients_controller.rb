class FoodNutrientsController < ApplicationController
  before_action :set_food_nutrient, only: [:show, :update, :destroy]

  # GET /food_nutrients
  def index
    @food_nutrients = FoodNutrient.all

    render json: @food_nutrients
  end

  # GET /food_nutrients/1
  def show
    render json: @food_nutrient
  end

  # POST /food_nutrients
  def create
    @food_nutrient = FoodNutrient.new(food_nutrient_params)

    if @food_nutrient.save
      render json: @food_nutrient, status: :created, location: @food_nutrient
    else
      render json: @food_nutrient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_nutrients/1
  def update
    if @food_nutrient.update(food_nutrient_params)
      render json: @food_nutrient
    else
      render json: @food_nutrient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_nutrients/1
  def destroy
    @food_nutrient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_nutrient
      @food_nutrient = FoodNutrient.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_nutrient_params
      params.require(:food_nutrient).permit(:nutrient_id, :food_id)
    end
end
