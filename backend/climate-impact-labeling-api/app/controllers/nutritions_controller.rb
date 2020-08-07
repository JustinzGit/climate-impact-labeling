class NutritionsController < ApplicationController
  before_action :set_nutrition, only: [:show, :update, :destroy]

  # GET /nutritions
  def index
    @nutritions = Nutrition.all

    render json: @nutritions
  end

  # GET /nutritions/1
  def show
    render json: @nutrition
  end

  # POST /nutritions
  def create
    @nutrition = Nutrition.new(nutrition_params)

    if @nutrition.save
      render json: @nutrition, status: :created, location: @nutrition
    else
      render json: @nutrition.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /nutritions/1
  def update
    if @nutrition.update(nutrition_params)
      render json: @nutrition
    else
      render json: @nutrition.errors, status: :unprocessable_entity
    end
  end

  # DELETE /nutritions/1
  def destroy
    @nutrition.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nutrition
      @nutrition = Nutrition.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def nutrition_params
      params.fetch(:nutrition, {})
    end
end
