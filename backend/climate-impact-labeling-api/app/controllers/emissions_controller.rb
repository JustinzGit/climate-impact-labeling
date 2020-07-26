class EmissionsController < ApplicationController
  before_action :set_emission, only: [:show, :update, :destroy]

  # GET /emissions
  def index
    @emissions = Emission.all

    render json: @emissions
  end

  # GET /emissions/1
  def show
    render json: @emission
  end

  # POST /emissions
  def create
    @emission = Emission.new(emission_params)

    if @emission.save
      render json: @emission, status: :created, location: @emission
    else
      render json: @emission.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /emissions/1
  def update
    if @emission.update(emission_params)
      render json: @emission
    else
      render json: @emission.errors, status: :unprocessable_entity
    end
  end

  # DELETE /emissions/1
  def destroy
    @emission.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_emission
      @emission = Emission.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def emission_params
      params.require(:emission).permit(:food_category, :land_use, :ghg_emissions, :acidifying_emissions, :eutrophying_emissions, :freshwater_withdrawl)
    end
end
