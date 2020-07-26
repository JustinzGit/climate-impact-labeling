class NutrientsController < ApplicationController
  before_action :set_nutrient, only: [:show, :update, :destroy]

  # GET /nutrients
  def index
    @nutrients = Nutrient.all

    render json: @nutrients
  end

  # GET /nutrients/1
  def show
    render json: @nutrient
  end

  # POST /nutrients
  def create
    @nutrient = Nutrient.new(nutrient_params)

    if @nutrient.save
      render json: @nutrient, status: :created, location: @nutrient
    else
      render json: @nutrient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /nutrients/1
  def update
    if @nutrient.update(nutrient_params)
      render json: @nutrient
    else
      render json: @nutrient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /nutrients/1
  def destroy
    @nutrient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nutrient
      @nutrient = Nutrient.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def nutrient_params
      params.require(:nutrient).permit(:nutrient_id, :name, :unit_name)
    end
end
