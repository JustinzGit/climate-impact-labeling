class FoodEmissionsController < ApplicationController
  before_action :set_food_emission, only: [:show, :update, :destroy]

  # GET /food_emissions
  def index
    @food_emissions = FoodEmission.all

    render json: @food_emissions
  end

  # GET /food_emissions/1
  def show
    render json: @food_emission
  end

  # POST /food_emissions
  def create
    @food_emission = FoodEmission.new(food_emission_params)

    if @food_emission.save
      render json: @food_emission, status: :created, location: @food_emission
    else
      render json: @food_emission.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_emissions/1
  def update
    if @food_emission.update(food_emission_params)
      render json: @food_emission
    else
      render json: @food_emission.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_emissions/1
  def destroy
    @food_emission.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_emission
      @food_emission = FoodEmission.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_emission_params
      params.require(:food_emission).permit(:food_id, :emission_id)
    end
end
