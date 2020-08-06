class FoodEmissionCategoriesController < ApplicationController
  before_action :set_food_emission_category, only: [:show, :update, :destroy]

  # GET /food_emission_categories
  def index
    @food_emission_categories = FoodEmissionCategory.all

    render json: @food_emission_categories
  end

  # GET /food_emission_categories/1
  def show
    render json: @food_emission_category
  end

  # POST /food_emission_categories
  def create
    @food_emission_category = FoodEmissionCategory.new(food_emission_category_params)

    if @food_emission_category.save
      render json: @food_emission_category, status: :created, location: @food_emission_category
    else
      render json: @food_emission_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_emission_categories/1
  def update
    if @food_emission_category.update(food_emission_category_params)
      render json: @food_emission_category
    else
      render json: @food_emission_category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_emission_categories/1
  def destroy
    @food_emission_category.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_emission_category
      @food_emission_category = FoodEmissionCategory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_emission_category_params
      params.fetch(:food_emission_category, {})
    end
end
